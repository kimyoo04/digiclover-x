const Documents = require("../models/document");
const Signatures = require("../models/signature");

module.exports = class DocumentsController {
  static async apiGetDocuments(req, res, next) {}
  static async apiGetDocumentById(req, res, next) {}

  static async apiPostOneDocument(req, res, next) {}
  static async apiUpdateOneDocument(req, res, next) {}
  static async apiDeleteOneDocument(req, res, next) {}

  static async apiGetDocumentNotSigned(req, res, next) {}
  static async apiGetDocumentSigned(req, res, next) {}
};
