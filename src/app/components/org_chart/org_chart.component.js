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
    }
  }

  startReviewerChange() {
    this.reviewerChangeStarted = true;
  }

  cancel() {
    this.reviewerChangeStarted = false;
    this.selectedElementIndex = undefined;
  }

  changeReviewer(childIndex, parentIndex) {
    let parentNode = this.chartData.rows[parentIndex];
    let childNode = this.chartData.rows[childIndex];
    let previousParentKey = childNode.c[1].v;

    childNode.c[1].v = parentNode.c[0].v;
    childNode.user_info.reviewer_id = parentNode.c[0].v;

    if (parentNode.c[1].v === childNode.c[0].v) { // the previous parent is the new child node
      parentNode.c[1].v = previousParentKey; // set the new parent node's parent to the previous child node's parent
      parentNode.user_info.reviewer_id = previousParentKey;
    }

    if (previousParentKey === null) { // the parent was root
      parentNode.c[1].v = null;
      parentNode.user_info.reviewer_id = null;
    }

    this.reviewerChangeStarted = false;
    this.selectedElementIndex = undefined;
    this.updateHierarchy();
  }
}

export const OrgChartComponent = {
  templateUrl: 'app/components/org_chart/org_chart.html',
  controller: OrgChartController,
  controllerAs: 'ctrl',
  bindings: {
    hierarchy: '='
  }
};
