var $ = Object.defineProperty;
var F = (c, e, t) => e in c ? $(c, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : c[e] = t;
var i = (c, e, t) => (F(c, typeof e != "symbol" ? e + "" : e, t), t);
class K {
  constructor(e, t) {
    i(this, "http");
    i(this, "baseUrl");
    i(this, "jsonParseReviver");
    this.http = t || window, this.baseUrl = e ?? "/pdf";
  }
  /**
   * @return Ok
   */
  generateFineReport(e) {
    let t = this.baseUrl + "/report/fines";
    t = t.replace(/[?&]$/, "");
    let s = {
      body: JSON.stringify(e),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf+tex"
      }
    };
    return this.http.fetch(t, s).then((r) => this.processGenerateFineReport(r));
  }
  processGenerateFineReport(e) {
    const t = e.status;
    let o = {};
    if (e.headers && e.headers.forEach && e.headers.forEach((s, r) => o[r] = s), t === 200 || t === 206) {
      const s = e.headers ? e.headers.get("content-disposition") : void 0;
      let r = s ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(s) : void 0, n = r && r.length > 1 ? r[3] || r[2] : void 0;
      return n ? n = decodeURIComponent(n) : (r = s ? /filename="?([^"]*?)"?(;|$)/g.exec(s) : void 0, n = r && r.length > 1 ? r[1] : void 0), e.blob().then((m) => ({ fileName: n, data: m, status: t, headers: o }));
    } else {
      if (t === 422)
        return e.text().then((s) => {
          let r = null, n = s === "" ? null : JSON.parse(s, this.jsonParseReviver);
          return r = J.fromJS(n), l("Validation Failed", t, s, o, r);
        });
      if (t === 500)
        return e.text().then((s) => {
          let r = null, n = s === "" ? null : JSON.parse(s, this.jsonParseReviver);
          return r = y.fromJS(n), l("Internal Server Error", t, s, o, r);
        });
      if (t !== 200 && t !== 204)
        return e.text().then((s) => l("An unexpected server error occurred.", t, s, o));
    }
    return Promise.resolve(null);
  }
  /**
   * @return Ok
   */
  generateUserReport(e) {
    let t = this.baseUrl + "/report/user";
    t = t.replace(/[?&]$/, "");
    let s = {
      body: JSON.stringify(e),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf+tex"
      }
    };
    return this.http.fetch(t, s).then((r) => this.processGenerateUserReport(r));
  }
  processGenerateUserReport(e) {
    const t = e.status;
    let o = {};
    if (e.headers && e.headers.forEach && e.headers.forEach((s, r) => o[r] = s), t === 200 || t === 206) {
      const s = e.headers ? e.headers.get("content-disposition") : void 0;
      let r = s ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(s) : void 0, n = r && r.length > 1 ? r[3] || r[2] : void 0;
      return n ? n = decodeURIComponent(n) : (r = s ? /filename="?([^"]*?)"?(;|$)/g.exec(s) : void 0, n = r && r.length > 1 ? r[1] : void 0), e.blob().then((m) => ({ fileName: n, data: m, status: t, headers: o }));
    } else {
      if (t === 422)
        return e.text().then((s) => {
          let r = null, n = s === "" ? null : JSON.parse(s, this.jsonParseReviver);
          return r = J.fromJS(n), l("Validation Failed", t, s, o, r);
        });
      if (t === 500)
        return e.text().then((s) => {
          let r = null, n = s === "" ? null : JSON.parse(s, this.jsonParseReviver);
          return r = y.fromJS(n), l("Internal Server Error", t, s, o, r);
        });
      if (t !== 200 && t !== 204)
        return e.text().then((s) => l("An unexpected server error occurred.", t, s, o));
    }
    return Promise.resolve(null);
  }
  /**
   * @return Ok
   */
  generatePayout(e) {
    let t = this.baseUrl + "/payout/user";
    t = t.replace(/[?&]$/, "");
    let s = {
      body: JSON.stringify(e),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf+tex"
      }
    };
    return this.http.fetch(t, s).then((r) => this.processGeneratePayout(r));
  }
  processGeneratePayout(e) {
    const t = e.status;
    let o = {};
    if (e.headers && e.headers.forEach && e.headers.forEach((s, r) => o[r] = s), t === 200 || t === 206) {
      const s = e.headers ? e.headers.get("content-disposition") : void 0;
      let r = s ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(s) : void 0, n = r && r.length > 1 ? r[3] || r[2] : void 0;
      return n ? n = decodeURIComponent(n) : (r = s ? /filename="?([^"]*?)"?(;|$)/g.exec(s) : void 0, n = r && r.length > 1 ? r[1] : void 0), e.blob().then((m) => ({ fileName: n, data: m, status: t, headers: o }));
    } else {
      if (t === 422)
        return e.text().then((s) => {
          let r = null, n = s === "" ? null : JSON.parse(s, this.jsonParseReviver);
          return r = J.fromJS(n), l("Validation Failed", t, s, o, r);
        });
      if (t === 500)
        return e.text().then((s) => {
          let r = null, n = s === "" ? null : JSON.parse(s, this.jsonParseReviver);
          return r = y.fromJS(n), l("Internal Server Error", t, s, o, r);
        });
      if (t !== 200 && t !== 204)
        return e.text().then((s) => l("An unexpected server error occurred.", t, s, o));
    }
    return Promise.resolve(null);
  }
  /**
   * @return Ok
   */
  generateDisbursement(e) {
    let t = this.baseUrl + "/payout/disbursement";
    t = t.replace(/[?&]$/, "");
    let s = {
      body: JSON.stringify(e),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf+tex"
      }
    };
    return this.http.fetch(t, s).then((r) => this.processGenerateDisbursement(r));
  }
  processGenerateDisbursement(e) {
    const t = e.status;
    let o = {};
    if (e.headers && e.headers.forEach && e.headers.forEach((s, r) => o[r] = s), t === 200 || t === 206) {
      const s = e.headers ? e.headers.get("content-disposition") : void 0;
      let r = s ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(s) : void 0, n = r && r.length > 1 ? r[3] || r[2] : void 0;
      return n ? n = decodeURIComponent(n) : (r = s ? /filename="?([^"]*?)"?(;|$)/g.exec(s) : void 0, n = r && r.length > 1 ? r[1] : void 0), e.blob().then((m) => ({ fileName: n, data: m, status: t, headers: o }));
    } else {
      if (t === 422)
        return e.text().then((s) => {
          let r = null, n = s === "" ? null : JSON.parse(s, this.jsonParseReviver);
          return r = J.fromJS(n), l("Validation Failed", t, s, o, r);
        });
      if (t === 500)
        return e.text().then((s) => {
          let r = null, n = s === "" ? null : JSON.parse(s, this.jsonParseReviver);
          return r = y.fromJS(n), l("Internal Server Error", t, s, o, r);
        });
      if (t !== 200 && t !== 204)
        return e.text().then((s) => l("An unexpected server error occurred.", t, s, o));
    }
    return Promise.resolve(null);
  }
  /**
   * @return Ok
   */
  generateContract(e, t) {
    let o = this.baseUrl + "/contract/{type}";
    if (e == null)
      throw new Error("The parameter 'type' must be defined.");
    o = o.replace("{type}", encodeURIComponent("" + e)), o = o.replace(/[?&]$/, "");
    let r = {
      body: JSON.stringify(t),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf+tex"
      }
    };
    return this.http.fetch(o, r).then((n) => this.processGenerateContract(n));
  }
  processGenerateContract(e) {
    const t = e.status;
    let o = {};
    if (e.headers && e.headers.forEach && e.headers.forEach((s, r) => o[r] = s), t === 200 || t === 206) {
      const s = e.headers ? e.headers.get("content-disposition") : void 0;
      let r = s ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(s) : void 0, n = r && r.length > 1 ? r[3] || r[2] : void 0;
      return n ? n = decodeURIComponent(n) : (r = s ? /filename="?([^"]*?)"?(;|$)/g.exec(s) : void 0, n = r && r.length > 1 ? r[1] : void 0), e.blob().then((m) => ({ fileName: n, data: m, status: t, headers: o }));
    } else {
      if (t === 422)
        return e.text().then((s) => {
          let r = null, n = s === "" ? null : JSON.parse(s, this.jsonParseReviver);
          return r = J.fromJS(n), l("Validation Failed", t, s, o, r);
        });
      if (t === 500)
        return e.text().then((s) => {
          let r = null, n = s === "" ? null : JSON.parse(s, this.jsonParseReviver);
          return r = y.fromJS(n), l("Internal Server Error", t, s, o, r);
        });
      if (t !== 200 && t !== 204)
        return e.text().then((s) => l("An unexpected server error occurred.", t, s, o));
    }
    return Promise.resolve(null);
  }
  /**
   * @return Ok
   */
  generateInvoice(e, t) {
    let o = this.baseUrl + "/invoice/{type}";
    if (e == null)
      throw new Error("The parameter 'type' must be defined.");
    o = o.replace("{type}", encodeURIComponent("" + e)), o = o.replace(/[?&]$/, "");
    let r = {
      body: JSON.stringify(t),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf+tex"
      }
    };
    return this.http.fetch(o, r).then((n) => this.processGenerateInvoice(n));
  }
  processGenerateInvoice(e) {
    const t = e.status;
    let o = {};
    if (e.headers && e.headers.forEach && e.headers.forEach((s, r) => o[r] = s), t === 200 || t === 206) {
      const s = e.headers ? e.headers.get("content-disposition") : void 0;
      let r = s ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(s) : void 0, n = r && r.length > 1 ? r[3] || r[2] : void 0;
      return n ? n = decodeURIComponent(n) : (r = s ? /filename="?([^"]*?)"?(;|$)/g.exec(s) : void 0, n = r && r.length > 1 ? r[1] : void 0), e.blob().then((m) => ({ fileName: n, data: m, status: t, headers: o }));
    } else {
      if (t === 422)
        return e.text().then((s) => {
          let r = null, n = s === "" ? null : JSON.parse(s, this.jsonParseReviver);
          return r = J.fromJS(n), l("Validation Failed", t, s, o, r);
        });
      if (t === 500)
        return e.text().then((s) => {
          let r = null, n = s === "" ? null : JSON.parse(s, this.jsonParseReviver);
          return r = y.fromJS(n), l("Internal Server Error", t, s, o, r);
        });
      if (t !== 200 && t !== 204)
        return e.text().then((s) => l("An unexpected server error occurred.", t, s, o));
    }
    return Promise.resolve(null);
  }
}
class J {
  constructor(e) {
    i(this, "message");
    i(this, "details");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.details = {});
  }
  init(e) {
    if (e && (this.message = e.message, e.details)) {
      this.details = {};
      for (let t in e.details)
        e.details.hasOwnProperty(t) && (this.details[t] = e.details[t]);
    }
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new J();
    return t.init(e), t;
  }
  toJSON(e) {
    if (e = typeof e == "object" ? e : {}, e.message = this.message, this.details) {
      e.details = {};
      for (let t in this.details)
        this.details.hasOwnProperty(t) && (e.details[t] = this.details[t]);
    }
    return e;
  }
}
class y {
  constructor(e) {
    i(this, "message");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
  }
  init(e) {
    e && (this.message = e.message);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new y();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.message = this.message, e;
  }
}
var z = /* @__PURE__ */ ((c) => (c.ZERO = "ZERO", c.LOW = "LOW", c.HIGH = "HIGH", c))(z || {});
class w {
  constructor(e) {
    i(this, "basePrice");
    i(this, "discount");
    i(this, "vatAmount");
    i(this, "vatCategory");
    i(this, "quantity");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
  }
  init(e) {
    e && (this.basePrice = e.basePrice, this.discount = e.discount, this.vatAmount = e.vatAmount, this.vatCategory = e.vatCategory, this.quantity = e.quantity);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new w();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.basePrice = this.basePrice, e.discount = this.discount, e.vatAmount = this.vatAmount, e.vatCategory = this.vatCategory, e.quantity = this.quantity, e;
  }
}
class g {
  constructor(e) {
    i(this, "name");
    i(this, "details");
    i(this, "summary");
    i(this, "specification");
    i(this, "pricing");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.pricing = new w());
  }
  init(e) {
    e && (this.name = e.name, this.details = e.details, this.summary = e.summary, this.specification = e.specification, this.pricing = e.pricing ? w.fromJS(e.pricing) : new w());
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new g();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.name = this.name, e.details = this.details, e.summary = this.summary, e.specification = this.specification, e.pricing = this.pricing ? this.pricing.toJSON() : void 0, e;
  }
}
class f {
  constructor(e) {
    i(this, "exclVat");
    i(this, "lowVat");
    i(this, "highVat");
    i(this, "inclVat");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
  }
  init(e) {
    e && (this.exclVat = e.exclVat, this.lowVat = e.lowVat, this.highVat = e.highVat, this.inclVat = e.inclVat);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new f();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.exclVat = this.exclVat, e.lowVat = this.lowVat, e.highVat = this.highVat, e.inclVat = this.inclVat, e;
  }
}
class O {
  constructor(e) {
    i(this, "startDate");
    i(this, "endDate");
    i(this, "fines");
    i(this, "total");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.fines = [], this.total = new f());
  }
  init(e) {
    if (e) {
      if (this.startDate = e.startDate ? new Date(e.startDate.toString()) : void 0, this.endDate = e.endDate ? new Date(e.endDate.toString()) : void 0, Array.isArray(e.fines)) {
        this.fines = [];
        for (let t of e.fines)
          this.fines.push(g.fromJS(t));
      }
      this.total = e.total ? f.fromJS(e.total) : new f();
    }
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new O();
    return t.init(e), t;
  }
  toJSON(e) {
    if (e = typeof e == "object" ? e : {}, e.startDate = this.startDate ? this.startDate.toISOString() : void 0, e.endDate = this.endDate ? this.endDate.toISOString() : void 0, Array.isArray(this.fines)) {
      e.fines = [];
      for (let t of this.fines)
        e.fines.push(t.toJSON());
    }
    return e.total = this.total ? this.total.toJSON() : void 0, e;
  }
}
var H = /* @__PURE__ */ ((c) => (c.DUTCH = "DUTCH", c.ENGLISH = "ENGLISH", c))(H || {}), q = /* @__PURE__ */ ((c) => (c.PDF = "PDF", c.TEX = "TEX", c))(q || {});
class u {
  constructor(e) {
    i(this, "name");
    i(this, "language");
    i(this, "fileType");
    i(this, "stationery");
    i(this, "createdAt");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
  }
  init(e) {
    e && (this.name = e.name, this.language = e.language, this.fileType = e.fileType, this.stationery = e.stationery, this.createdAt = e.createdAt ? new Date(e.createdAt.toString()) : void 0);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new u();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.name = this.name, e.language = this.language, e.fileType = this.fileType, e.stationery = this.stationery, e.createdAt = this.createdAt ? this.createdAt.toISOString() : void 0, e;
  }
}
class C {
  constructor(e) {
    i(this, "params");
    i(this, "settings");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.params = new O(), this.settings = new u());
  }
  init(e) {
    e && (this.params = e.params ? O.fromJS(e.params) : new O(), this.settings = e.settings ? u.fromJS(e.settings) : new u());
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new C();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.params = this.params ? this.params.toJSON() : void 0, e.settings = this.settings ? this.settings.toJSON() : void 0, e;
  }
}
class h {
  constructor(e) {
    i(this, "firstName");
    i(this, "lastNamePreposition");
    i(this, "lastName");
    i(this, "fullName");
    i(this, "function");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
  }
  init(e) {
    e && (this.firstName = e.firstName, this.lastNamePreposition = e.lastNamePreposition, this.lastName = e.lastName, this.fullName = e.fullName, this.function = e.function);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new h();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.firstName = this.firstName, e.lastNamePreposition = this.lastNamePreposition, e.lastName = this.lastName, e.fullName = this.fullName, e.function = this.function, e;
  }
}
class N {
  constructor(e) {
    i(this, "startDate");
    i(this, "endDate");
    i(this, "entries");
    i(this, "total");
    i(this, "description");
    i(this, "account");
    i(this, "type");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.entries = [], this.total = new f(), this.account = new h());
  }
  init(e) {
    if (e) {
      if (this.startDate = e.startDate ? new Date(e.startDate.toString()) : void 0, this.endDate = e.endDate ? new Date(e.endDate.toString()) : void 0, Array.isArray(e.entries)) {
        this.entries = [];
        for (let t of e.entries)
          this.entries.push(g.fromJS(t));
      }
      this.total = e.total ? f.fromJS(e.total) : new f(), this.description = e.description, this.account = e.account ? h.fromJS(e.account) : new h(), this.type = e.type;
    }
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new N();
    return t.init(e), t;
  }
  toJSON(e) {
    if (e = typeof e == "object" ? e : {}, e.startDate = this.startDate ? this.startDate.toISOString() : void 0, e.endDate = this.endDate ? this.endDate.toISOString() : void 0, Array.isArray(this.entries)) {
      e.entries = [];
      for (let t of this.entries)
        e.entries.push(t.toJSON());
    }
    return e.total = this.total ? this.total.toJSON() : void 0, e.description = this.description, e.account = this.account ? this.account.toJSON() : void 0, e.type = this.type, e;
  }
}
class E {
  constructor(e) {
    i(this, "params");
    i(this, "settings");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.params = new N(), this.settings = new u());
  }
  init(e) {
    e && (this.params = e.params ? N.fromJS(e.params) : new N(), this.settings = e.settings ? u.fromJS(e.settings) : new u());
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new E();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.params = this.params ? this.params.toJSON() : void 0, e.settings = this.settings ? this.settings.toJSON() : void 0, e;
  }
}
class b {
  constructor(e) {
    i(this, "bankAccountName");
    i(this, "bankAccountNumber");
    i(this, "amount");
    i(this, "reference");
    i(this, "date");
    i(this, "debtorNumber");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
  }
  init(e) {
    e && (this.bankAccountName = e.bankAccountName, this.bankAccountNumber = e.bankAccountNumber, this.amount = e.amount, this.reference = e.reference, this.date = e.date ? new Date(e.date.toString()) : void 0, this.debtorNumber = e.debtorNumber);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new b();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.bankAccountName = this.bankAccountName, e.bankAccountNumber = this.bankAccountNumber, e.amount = this.amount, e.reference = this.reference, e.date = this.date ? this.date.toISOString() : void 0, e.debtorNumber = this.debtorNumber, e;
  }
}
class D {
  constructor(e) {
    i(this, "payout");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.payout = new b());
  }
  init(e) {
    e && (this.payout = e.payout ? b.fromJS(e.payout) : new b());
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new D();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.payout = this.payout ? this.payout.toJSON() : void 0, e;
  }
}
class x {
  constructor(e) {
    i(this, "params");
    i(this, "settings");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.params = new D(), this.settings = new u());
  }
  init(e) {
    e && (this.params = e.params ? D.fromJS(e.params) : new D(), this.settings = e.settings ? u.fromJS(e.settings) : new u());
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new x();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.params = this.params ? this.params.toJSON() : void 0, e.settings = this.settings ? this.settings.toJSON() : void 0, e;
  }
}
class j {
  constructor(e) {
    i(this, "startDate");
    i(this, "endDate");
    i(this, "entries");
    i(this, "total");
    i(this, "description");
    i(this, "reference");
    i(this, "debtorId");
    i(this, "account");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.entries = [], this.total = new f(), this.account = new h());
  }
  init(e) {
    if (e) {
      if (this.startDate = e.startDate ? new Date(e.startDate.toString()) : void 0, this.endDate = e.endDate ? new Date(e.endDate.toString()) : void 0, Array.isArray(e.entries)) {
        this.entries = [];
        for (let t of e.entries)
          this.entries.push(g.fromJS(t));
      }
      this.total = e.total ? f.fromJS(e.total) : new f(), this.description = e.description, this.reference = e.reference, this.debtorId = e.debtorId, this.account = e.account ? h.fromJS(e.account) : new h();
    }
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new j();
    return t.init(e), t;
  }
  toJSON(e) {
    if (e = typeof e == "object" ? e : {}, e.startDate = this.startDate ? this.startDate.toISOString() : void 0, e.endDate = this.endDate ? this.endDate.toISOString() : void 0, Array.isArray(this.entries)) {
      e.entries = [];
      for (let t of this.entries)
        e.entries.push(t.toJSON());
    }
    return e.total = this.total ? this.total.toJSON() : void 0, e.description = this.description, e.reference = this.reference, e.debtorId = this.debtorId, e.account = this.account ? this.account.toJSON() : void 0, e;
  }
}
class V {
  constructor(e) {
    i(this, "params");
    i(this, "settings");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.params = new j(), this.settings = new u());
  }
  init(e) {
    e && (this.params = e.params ? j.fromJS(e.params) : new j(), this.settings = e.settings ? u.fromJS(e.settings) : new u());
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new V();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.params = this.params ? this.params.toJSON() : void 0, e.settings = this.settings ? this.settings.toJSON() : void 0, e;
  }
}
var M = /* @__PURE__ */ ((c) => (c.Contract = "contract", c.Quote = "quote", c))(M || {});
class p {
  constructor(e) {
    i(this, "date");
    i(this, "dueDate");
    i(this, "dueDays");
    i(this, "startDate");
    i(this, "endDate");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
  }
  init(e) {
    e && (this.date = e.date ? new Date(e.date.toString()) : void 0, this.dueDate = e.dueDate ? new Date(e.dueDate.toString()) : void 0, this.dueDays = e.dueDays, this.startDate = e.startDate ? new Date(e.startDate.toString()) : void 0, this.endDate = e.endDate ? new Date(e.endDate.toString()) : void 0);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new p();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.date = this.date ? this.date.toISOString() : void 0, e.dueDate = this.dueDate ? this.dueDate.toISOString() : void 0, e.dueDays = this.dueDays, e.startDate = this.startDate ? this.startDate.toISOString() : void 0, e.endDate = this.endDate ? this.endDate.toISOString() : void 0, e;
  }
}
class S {
  constructor(e) {
    i(this, "name");
    i(this, "id");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
  }
  init(e) {
    e && (this.name = e.name, this.id = e.id);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new S();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.name = this.name, e.id = this.id, e;
  }
}
class v {
  constructor(e) {
    i(this, "street");
    i(this, "postalCode");
    i(this, "city");
    i(this, "country");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
  }
  init(e) {
    e && (this.street = e.street, this.postalCode = e.postalCode, this.city = e.city, this.country = e.country);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new v();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.street = this.street, e.postalCode = this.postalCode, e.city = this.city, e.country = this.country, e;
  }
}
class R {
  constructor(e) {
    i(this, "ourReference");
    i(this, "yourReference");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
  }
  init(e) {
    e && (this.ourReference = e.ourReference, this.yourReference = e.yourReference);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new R();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.ourReference = this.ourReference, e.yourReference = this.yourReference, e;
  }
}
class P {
  constructor(e) {
    i(this, "subject");
    i(this, "sender");
    i(this, "recipient");
    i(this, "dates");
    i(this, "company");
    i(this, "address");
    i(this, "reference");
    i(this, "products");
    i(this, "pricing");
    i(this, "firstSignee");
    i(this, "secondSignee");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.sender = new h(), this.recipient = new h(), this.dates = new p(), this.company = new S(), this.address = new v(), this.products = [], this.pricing = new f(), this.firstSignee = new h(), this.secondSignee = new h());
  }
  init(e) {
    if (e) {
      if (this.subject = e.subject, this.sender = e.sender ? h.fromJS(e.sender) : new h(), this.recipient = e.recipient ? h.fromJS(e.recipient) : new h(), this.dates = e.dates ? p.fromJS(e.dates) : new p(), this.company = e.company ? S.fromJS(e.company) : new S(), this.address = e.address ? v.fromJS(e.address) : new v(), this.reference = e.reference ? R.fromJS(e.reference) : void 0, Array.isArray(e.products)) {
        this.products = [];
        for (let t of e.products)
          this.products.push(g.fromJS(t));
      }
      this.pricing = e.pricing ? f.fromJS(e.pricing) : new f(), this.firstSignee = e.firstSignee ? h.fromJS(e.firstSignee) : new h(), this.secondSignee = e.secondSignee ? h.fromJS(e.secondSignee) : new h();
    }
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new P();
    return t.init(e), t;
  }
  toJSON(e) {
    if (e = typeof e == "object" ? e : {}, e.subject = this.subject, e.sender = this.sender ? this.sender.toJSON() : void 0, e.recipient = this.recipient ? this.recipient.toJSON() : void 0, e.dates = this.dates ? this.dates.toJSON() : void 0, e.company = this.company ? this.company.toJSON() : void 0, e.address = this.address ? this.address.toJSON() : void 0, e.reference = this.reference ? this.reference.toJSON() : void 0, Array.isArray(this.products)) {
      e.products = [];
      for (let t of this.products)
        e.products.push(t.toJSON());
    }
    return e.pricing = this.pricing ? this.pricing.toJSON() : void 0, e.firstSignee = this.firstSignee ? this.firstSignee.toJSON() : void 0, e.secondSignee = this.secondSignee ? this.secondSignee.toJSON() : void 0, e;
  }
}
class U {
  constructor(e) {
    i(this, "params");
    i(this, "settings");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.params = new P(), this.settings = new u());
  }
  init(e) {
    e && (this.params = e.params ? P.fromJS(e.params) : new P(), this.settings = e.settings ? u.fromJS(e.settings) : new u());
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new U();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.params = this.params ? this.params.toJSON() : void 0, e.settings = this.settings ? this.settings.toJSON() : void 0, e;
  }
}
var L = /* @__PURE__ */ ((c) => (c.Invoice = "invoice", c.Weeklysales = "weeklysales", c.Creditnota = "creditnota", c))(L || {});
class I {
  constructor(e) {
    i(this, "ourReference");
    i(this, "yourReference");
    i(this, "costCenter");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
  }
  init(e) {
    e && (this.ourReference = e.ourReference, this.yourReference = e.yourReference, this.costCenter = e.costCenter);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new I();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.ourReference = this.ourReference, e.yourReference = this.yourReference, e.costCenter = this.costCenter, e;
  }
}
class G {
  constructor(e) {
    i(this, "products");
    i(this, "pricing");
    i(this, "subject");
    i(this, "sender");
    i(this, "recipient");
    i(this, "dates");
    i(this, "company");
    i(this, "address");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.products = [], this.pricing = new f(), this.sender = new h(), this.recipient = new h(), this.dates = new p(), this.company = new S(), this.address = new v());
  }
  init(e) {
    if (e) {
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
      if (Array.isArray(e.products)) {
        this.products = [];
        for (let o of e.products)
          this.products.push(g.fromJS(o));
      }
      this.pricing = e.pricing ? f.fromJS(e.pricing) : new f(), this.subject = e.subject, this.sender = e.sender ? h.fromJS(e.sender) : new h(), this.recipient = e.recipient ? h.fromJS(e.recipient) : new h(), this.dates = e.dates ? p.fromJS(e.dates) : new p(), this.company = e.company ? S.fromJS(e.company) : new S(), this.address = e.address ? v.fromJS(e.address) : new v();
    }
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new G();
    return t.init(e), t;
  }
  toJSON(e) {
    e = typeof e == "object" ? e : {};
    for (var t in this)
      this.hasOwnProperty(t) && (e[t] = this[t]);
    if (Array.isArray(this.products)) {
      e.products = [];
      for (let o of this.products)
        e.products.push(o.toJSON());
    }
    return e.pricing = this.pricing ? this.pricing.toJSON() : void 0, e.subject = this.subject, e.sender = this.sender ? this.sender.toJSON() : void 0, e.recipient = this.recipient ? this.recipient.toJSON() : void 0, e.dates = this.dates ? this.dates.toJSON() : void 0, e.company = this.company ? this.company.toJSON() : void 0, e.address = this.address ? this.address.toJSON() : void 0, e;
  }
}
class A {
  constructor(e) {
    i(this, "products");
    i(this, "pricing");
    i(this, "subject");
    i(this, "sender");
    i(this, "recipient");
    i(this, "dates");
    i(this, "company");
    i(this, "address");
    i(this, "summarizedProducts");
    i(this, "reference");
    i(this, "description");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.products = [], this.pricing = new f(), this.sender = new h(), this.recipient = new h(), this.dates = new p(), this.company = new S(), this.address = new v());
  }
  init(e) {
    if (e) {
      if (Array.isArray(e.products)) {
        this.products = [];
        for (let t of e.products)
          this.products.push(g.fromJS(t));
      }
      if (this.pricing = e.pricing ? f.fromJS(e.pricing) : new f(), this.subject = e.subject, this.sender = e.sender ? h.fromJS(e.sender) : new h(), this.recipient = e.recipient ? h.fromJS(e.recipient) : new h(), this.dates = e.dates ? p.fromJS(e.dates) : new p(), this.company = e.company ? S.fromJS(e.company) : new S(), this.address = e.address ? v.fromJS(e.address) : new v(), Array.isArray(e.summarizedProducts)) {
        this.summarizedProducts = [];
        for (let t of e.summarizedProducts)
          this.summarizedProducts.push(g.fromJS(t));
      }
      this.reference = e.reference ? I.fromJS(e.reference) : void 0, this.description = e.description;
    }
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new A();
    return t.init(e), t;
  }
  toJSON(e) {
    if (e = typeof e == "object" ? e : {}, Array.isArray(this.products)) {
      e.products = [];
      for (let t of this.products)
        e.products.push(t.toJSON());
    }
    if (e.pricing = this.pricing ? this.pricing.toJSON() : void 0, e.subject = this.subject, e.sender = this.sender ? this.sender.toJSON() : void 0, e.recipient = this.recipient ? this.recipient.toJSON() : void 0, e.dates = this.dates ? this.dates.toJSON() : void 0, e.company = this.company ? this.company.toJSON() : void 0, e.address = this.address ? this.address.toJSON() : void 0, Array.isArray(this.summarizedProducts)) {
      e.summarizedProducts = [];
      for (let t of this.summarizedProducts)
        e.summarizedProducts.push(t.toJSON());
    }
    return e.reference = this.reference ? this.reference.toJSON() : void 0, e.description = this.description, e;
  }
}
class k {
  constructor(e) {
    i(this, "params");
    i(this, "settings");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.params = new A(), this.settings = new u());
  }
  init(e) {
    e && (this.params = e.params ? A.fromJS(e.params) : new A(), this.settings = e.settings ? u.fromJS(e.settings) : new u());
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new k();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.params = this.params ? this.params.toJSON() : void 0, e.settings = this.settings ? this.settings.toJSON() : void 0, e;
  }
}
var W = /* @__PURE__ */ ((c) => (c.Validation_failed = "Validation failed", c))(W || {}), X = /* @__PURE__ */ ((c) => (c.Internal_Server_Error = "Internal Server Error", c))(X || {}), Z = /* @__PURE__ */ ((c) => (c.Sales = "sales", c.Purchases = "purchases", c))(Z || {});
class Q extends Error {
  constructor(t, o, s, r, n) {
    super();
    i(this, "message");
    i(this, "status");
    i(this, "response");
    i(this, "headers");
    i(this, "result");
    i(this, "isApiException", !0);
    this.message = t, this.status = o, this.response = s, this.headers = r, this.result = n;
  }
  static isApiException(t) {
    return t.isApiException === !0;
  }
}
function l(c, e, t, o, s) {
  throw s ?? new Q(c, e, t, o, null);
}
export {
  v as Address,
  Q as ApiException,
  K as Client,
  S as Company,
  P as ContractParameters,
  U as ContractRouteParams,
  M as ContractType,
  p as Dates,
  u as FileSettings,
  O as FineReportParameters,
  C as FineRouteParams,
  h as Identity,
  y as InternalError,
  X as InternalErrorMessage,
  A as InvoiceParameters,
  I as InvoiceReferences,
  k as InvoiceRouteParams,
  L as InvoiceType,
  H as Language,
  b as Payout,
  D as PayoutParameters,
  x as PayoutRouteParams,
  g as Product,
  w as ProductPricing,
  G as Reference__,
  R as References,
  q as ReturnFileType,
  j as SellerPayoutParameters,
  V as SellerPayoutRouteParams,
  f as TotalPricing,
  N as UserReportParameters,
  Z as UserReportParametersType,
  E as UserRouteParams,
  z as VAT,
  J as ValidateErrorJSON,
  W as ValidateErrorJSONMessage
};
