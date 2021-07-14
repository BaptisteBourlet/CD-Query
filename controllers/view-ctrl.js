

exports.getReportOverview = async (req, res) => {
   res.render('./reports/reports');
}

exports.getUserGroupOverview = async(req, res) => {
   res.render('./userGroup/overview');
}

exports.getUserGroupLinkOverview = async(req, res) => {
   res.render('./groupReportLink/groupReportLink');
}