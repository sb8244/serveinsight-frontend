import ngInject from '../../decorators/ng_inject';

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

@ngInject('notify')
class OrgChartController {
  constructor() {
    this.chartData = hierarchyToChartData(this.hierarchy);
    this.chart = {
      type: "OrgChart",
      data: this.chartData
    };
  }

  updateHierarchy() {
    this.hierarchy = chartDataToHierarchy(this.chartData);
    this.onChange(this.hierarchy);
  }

  updatedInformation() {
    let data = this.chartData.rows[this.selectedElementIndex] || {};
    data.c[0].f = this.selectedInfo().name;
    this.onChange(this.hierarchy);
  }

  selected(item, chart) {
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
  }

  changeReviewer(childIndex, parentIndex) {
    let parentNode = this.chartData.rows[parentIndex];
    let childNode = this.chartData.rows[childIndex];
    let movingAChildNode = this.isChildNode(childNode, parentNode);

    if (!movingAChildNode) {
      childNode.c[1].v = parentNode.c[0].v;
      childNode.user_info.reviewer_id = parentNode.c[0].v;
    } else {
      this.notify('Cannot change this reviewer without causing review loop. First, remove the reviewer to separate the org chart.');
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
}

export const OrgChartComponent = {
  templateUrl: 'app/components/org_chart/org_chart.html',
  controller: OrgChartController,
  controllerAs: 'ctrl',
  bindings: {
    hierarchy: '=',
    onChange: '=?'
  }
};
