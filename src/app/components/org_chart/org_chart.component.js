import ngInject from '../../decorators/ng_inject';

@ngInject('notify', 'Restangular')
class OrgChartController {
  constructor() {
    this.init();
  }

  init() {
    getHierarchy(this.Restangular).then((hierarchy) => {
      this.hierarchy = hierarchy;
      this.chartData = hierarchyToChartData(hierarchy);
      this.chart = {
        type: "OrgChart",
        data: this.chartData
      };
    });
  }

  onChange() {
    this.canSave = true;
  }

  updateHierarchy() {
    this.hierarchy = chartDataToHierarchy(this.chartData);
    this.onChange();
  }

  updateChartData() {
    this.chartData = hierarchyToChartData(this.hierarchy);
    this.chart = {
      type: "OrgChart",
      data: this.chartData
    };
  }

  updatedInformation() {
    let data = this.chartData.rows[this.selectedElementIndex] || {};
    data.c[0].f = this.selectedInfo().name;
    this.onChange();
  }

  selected(item, chart) {
    this.showInvite = false;

    if (item) {
      if (this.reviewerChangeStarted) {
        this.changeReviewer(this.selectedElementIndex, item.row);
        chart.setSelection([]);
      } else {
        this.selectedElementIndex = item.row;
      }
    } else {
      this.cancel();
      this.selectedElementIndex = undefined;
    }
  }

  selectedInfo() {
    let data = this.chartData.rows[this.selectedElementIndex] || {};
    return data.user_info;
  }

  startReviewerChange() {
    this.reviewerChangeStarted = true;
  }

  cancel() {
    this.reviewerChangeStarted = false;
  }

  removeReviewer() {
    let element = this.chartData.rows[this.selectedElementIndex];
    element.c[1].v = null;
    element.user_info.reviewer_id = null;
    this.updateHierarchy();
  }

  changeReviewer(childIndex, parentIndex) {
    let parentNode = this.chartData.rows[parentIndex];
    let childNode = this.chartData.rows[childIndex];
    let movingAChildNode = this.isChildNode(childNode, parentNode);

    if (!movingAChildNode) {
      childNode.c[1].v = parentNode.c[0].v;
      childNode.user_info.reviewer_id = parentNode.c[0].v;
    } else {
      this.notify('Cannot change this reviewer without causing review loop. First, remove a lower reviewer to separate the org chart.');
    }

    this.reviewerChangeStarted = false;
    this.selectedElementIndex = undefined;
    this.updateHierarchy();
  }

  isChildNode(parentNode, childNode) {
    let frontier = [parentNode.c[0].v];

    while(frontier.length > 0) {
      let id = frontier.shift();

      if (id == childNode.c[0].v) {
        return true;
      }

      this.chartData.rows.forEach(function(row) {
        if (row.c[1].v == id) {
          frontier.push(row.c[0].v);
        }
      });
    }

    return false;
  }

  userInvited(invite) {
    let member = objToMember(invite.organization_membership);
    this.hierarchy.push(member);
    this.updateChartData();
  }

  save() {
    let data = this.hierarchy.map((obj) => {
      return {
        id: obj.id,
        name: obj.name,
        reviewer_id: obj.reviewer_id
      };
    });

    this.Restangular.all("organization_memberships").customPUT({ data }, "bulk_update").then(() => {
      this.init();
    }).finally(() => this.canSave = false);
  };
}

export const OrgChartComponent = {
  templateUrl: 'app/components/org_chart/org_chart.html',
  controller: OrgChartController,
  controllerAs: 'ctrl',
  bindings: {}
};

function hierarchyToChartData(hierarchy) {
  return {
    cols: [
        {"label": "Name", "pattern": "", "type": "string"},
        {"label": "Reviewer", "pattern": "", "type": "string"}
    ],
    rows: hierarchy.map((userInfo) => {
      return {
        user_info: userInfo,
        c: [
          { v: userInfo.id, f: userInfo.name },
          { v: userInfo.reviewer_id }
        ]
      };
    })
  };
}

function chartDataToHierarchy(chartData) {
  return chartData.rows.map((row) => {
    return row.user_info;
  });
}

function getHierarchy(Restangular) {
  return Restangular.all("organization_memberships").getList().then((data) => {
    return data.map((member) => {
      // Strip out unnecessary data to avoid bugs
      return objToMember(member);
    });
  });
}

function objToMember(member) {
  return {
    id: member.id,
    name: member.name,
    email: member.email,
    reviewer_id: member.reviewer_id
  }
}
