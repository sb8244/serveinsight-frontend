class OrgChartController {
  constructor() {
    this.chartData = this.hierarchy;
    this.chart = {
      type: "OrgChart",
      data: this.chartData
    };
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
    if (parentNode.c[1].v === childNode.c[0].v) { // the previous parent is the new child node
      parentNode.c[1].v = previousParentKey; // set the new parent node's parent to the previous child node's parent
    }

    this.reviewerChangeStarted = false;
    this.selectedElementIndex = undefined;
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
