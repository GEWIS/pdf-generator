var H = Object.defineProperty;
var M = (c, e, t) => e in c ? H(c, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : c[e] = t;
var r = (c, e, t) => (M(c, typeof e != "symbol" ? e + "" : e, t), t);
class d {
  constructor(e, t) {
    r(this, "http");
    r(this, "baseUrl");
    r(this, "jsonParseReviver");
    this.http = t || window, this.baseUrl = e ?? "/pdf";
  }
  /**
   * @return Ok
   */
  generateWriteOff(e) {
    let t = this.baseUrl + "/write-off";
    t = t.replace(/[?&]$/, "");
    let i = {
      body: JSON.stringify(e),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf+tex"
      }
    };
    return this.http.fetch(t, i).then((s) => this.processGenerateWriteOff(s));
  }
  processGenerateWriteOff(e) {
    const t = e.status;
    let o = {};
    if (e.headers && e.headers.forEach && e.headers.forEach((i, s) => o[s] = i), t === 200 || t === 206) {
      const i = e.headers ? e.headers.get("content-disposition") : void 0;
      let s = i ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(i) : void 0, n = s && s.length > 1 ? s[3] || s[2] : void 0;
      return n ? n = decodeURIComponent(n) : (s = i ? /filename="?([^"]*?)"?(;|$)/g.exec(i) : void 0, n = s && s.length > 1 ? s[1] : void 0), e.blob().then((m) => ({ fileName: n, data: m, status: t, headers: o }));
    } else {
      if (t === 422)
        return e.text().then((i) => {
          let s = null, n = i === "" ? null : JSON.parse(i, this.jsonParseReviver);
          return s = g.fromJS(n), u("Validation Failed", t, i, o, s);
        });
      if (t === 500)
        return e.text().then((i) => {
          let s = null, n = i === "" ? null : JSON.parse(i, this.jsonParseReviver);
          return s = J.fromJS(n), u("Internal Server Error", t, i, o, s);
        });
      if (t !== 200 && t !== 204)
        return e.text().then((i) => u("An unexpected server error occurred.", t, i, o));
    }
    return Promise.resolve(null);
  }
  /**
   * @return Ok
   */
  generateFineReport(e) {
    let t = this.baseUrl + "/report/fines";
    t = t.replace(/[?&]$/, "");
    let i = {
      body: JSON.stringify(e),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf+tex"
      }
    };
    return this.http.fetch(t, i).then((s) => this.processGenerateFineReport(s));
  }
  processGenerateFineReport(e) {
    const t = e.status;
    let o = {};
    if (e.headers && e.headers.forEach && e.headers.forEach((i, s) => o[s] = i), t === 200 || t === 206) {
      const i = e.headers ? e.headers.get("content-disposition") : void 0;
      let s = i ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(i) : void 0, n = s && s.length > 1 ? s[3] || s[2] : void 0;
      return n ? n = decodeURIComponent(n) : (s = i ? /filename="?([^"]*?)"?(;|$)/g.exec(i) : void 0, n = s && s.length > 1 ? s[1] : void 0), e.blob().then((m) => ({ fileName: n, data: m, status: t, headers: o }));
    } else {
      if (t === 422)
        return e.text().then((i) => {
          let s = null, n = i === "" ? null : JSON.parse(i, this.jsonParseReviver);
          return s = g.fromJS(n), u("Validation Failed", t, i, o, s);
        });
      if (t === 500)
        return e.text().then((i) => {
          let s = null, n = i === "" ? null : JSON.parse(i, this.jsonParseReviver);
          return s = J.fromJS(n), u("Internal Server Error", t, i, o, s);
        });
      if (t !== 200 && t !== 204)
        return e.text().then((i) => u("An unexpected server error occurred.", t, i, o));
    }
    return Promise.resolve(null);
  }
  /**
   * @return Ok
   */
  generateUserReport(e) {
    let t = this.baseUrl + "/report/user";
    t = t.replace(/[?&]$/, "");
    let i = {
      body: JSON.stringify(e),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf+tex"
      }
    };
    return this.http.fetch(t, i).then((s) => this.processGenerateUserReport(s));
  }
  processGenerateUserReport(e) {
    const t = e.status;
    let o = {};
    if (e.headers && e.headers.forEach && e.headers.forEach((i, s) => o[s] = i), t === 200 || t === 206) {
      const i = e.headers ? e.headers.get("content-disposition") : void 0;
      let s = i ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(i) : void 0, n = s && s.length > 1 ? s[3] || s[2] : void 0;
      return n ? n = decodeURIComponent(n) : (s = i ? /filename="?([^"]*?)"?(;|$)/g.exec(i) : void 0, n = s && s.length > 1 ? s[1] : void 0), e.blob().then((m) => ({ fileName: n, data: m, status: t, headers: o }));
    } else {
      if (t === 422)
        return e.text().then((i) => {
          let s = null, n = i === "" ? null : JSON.parse(i, this.jsonParseReviver);
          return s = g.fromJS(n), u("Validation Failed", t, i, o, s);
        });
      if (t === 500)
        return e.text().then((i) => {
          let s = null, n = i === "" ? null : JSON.parse(i, this.jsonParseReviver);
          return s = J.fromJS(n), u("Internal Server Error", t, i, o, s);
        });
      if (t !== 200 && t !== 204)
        return e.text().then((i) => u("An unexpected server error occurred.", t, i, o));
    }
    return Promise.resolve(null);
  }
  /**
   * @return Ok
   */
  generatePayout(e) {
    let t = this.baseUrl + "/payout/user";
    t = t.replace(/[?&]$/, "");
    let i = {
      body: JSON.stringify(e),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf+tex"
      }
    };
    return this.http.fetch(t, i).then((s) => this.processGeneratePayout(s));
  }
  processGeneratePayout(e) {
    const t = e.status;
    let o = {};
    if (e.headers && e.headers.forEach && e.headers.forEach((i, s) => o[s] = i), t === 200 || t === 206) {
      const i = e.headers ? e.headers.get("content-disposition") : void 0;
      let s = i ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(i) : void 0, n = s && s.length > 1 ? s[3] || s[2] : void 0;
      return n ? n = decodeURIComponent(n) : (s = i ? /filename="?([^"]*?)"?(;|$)/g.exec(i) : void 0, n = s && s.length > 1 ? s[1] : void 0), e.blob().then((m) => ({ fileName: n, data: m, status: t, headers: o }));
    } else {
      if (t === 422)
        return e.text().then((i) => {
          let s = null, n = i === "" ? null : JSON.parse(i, this.jsonParseReviver);
          return s = g.fromJS(n), u("Validation Failed", t, i, o, s);
        });
      if (t === 500)
        return e.text().then((i) => {
          let s = null, n = i === "" ? null : JSON.parse(i, this.jsonParseReviver);
          return s = J.fromJS(n), u("Internal Server Error", t, i, o, s);
        });
      if (t !== 200 && t !== 204)
        return e.text().then((i) => u("An unexpected server error occurred.", t, i, o));
    }
    return Promise.resolve(null);
  }
  /**
   * @return Ok
   */
  generateDisbursement(e) {
    let t = this.baseUrl + "/payout/disbursement";
    t = t.replace(/[?&]$/, "");
    let i = {
      body: JSON.stringify(e),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf+tex"
      }
    };
    return this.http.fetch(t, i).then((s) => this.processGenerateDisbursement(s));
  }
  processGenerateDisbursement(e) {
    const t = e.status;
    let o = {};
    if (e.headers && e.headers.forEach && e.headers.forEach((i, s) => o[s] = i), t === 200 || t === 206) {
      const i = e.headers ? e.headers.get("content-disposition") : void 0;
      let s = i ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(i) : void 0, n = s && s.length > 1 ? s[3] || s[2] : void 0;
      return n ? n = decodeURIComponent(n) : (s = i ? /filename="?([^"]*?)"?(;|$)/g.exec(i) : void 0, n = s && s.length > 1 ? s[1] : void 0), e.blob().then((m) => ({ fileName: n, data: m, status: t, headers: o }));
    } else {
      if (t === 422)
        return e.text().then((i) => {
          let s = null, n = i === "" ? null : JSON.parse(i, this.jsonParseReviver);
          return s = g.fromJS(n), u("Validation Failed", t, i, o, s);
        });
      if (t === 500)
        return e.text().then((i) => {
          let s = null, n = i === "" ? null : JSON.parse(i, this.jsonParseReviver);
          return s = J.fromJS(n), u("Internal Server Error", t, i, o, s);
        });
      if (t !== 200 && t !== 204)
        return e.text().then((i) => u("An unexpected server error occurred.", t, i, o));
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
    let s = {
      body: JSON.stringify(t),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf+tex"
      }
    };
    return this.http.fetch(o, s).then((n) => this.processGenerateContract(n));
  }
  processGenerateContract(e) {
    const t = e.status;
    let o = {};
    if (e.headers && e.headers.forEach && e.headers.forEach((i, s) => o[s] = i), t === 200 || t === 206) {
      const i = e.headers ? e.headers.get("content-disposition") : void 0;
      let s = i ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(i) : void 0, n = s && s.length > 1 ? s[3] || s[2] : void 0;
      return n ? n = decodeURIComponent(n) : (s = i ? /filename="?([^"]*?)"?(;|$)/g.exec(i) : void 0, n = s && s.length > 1 ? s[1] : void 0), e.blob().then((m) => ({ fileName: n, data: m, status: t, headers: o }));
    } else {
      if (t === 422)
        return e.text().then((i) => {
          let s = null, n = i === "" ? null : JSON.parse(i, this.jsonParseReviver);
          return s = g.fromJS(n), u("Validation Failed", t, i, o, s);
        });
      if (t === 500)
        return e.text().then((i) => {
          let s = null, n = i === "" ? null : JSON.parse(i, this.jsonParseReviver);
          return s = J.fromJS(n), u("Internal Server Error", t, i, o, s);
        });
      if (t !== 200 && t !== 204)
        return e.text().then((i) => u("An unexpected server error occurred.", t, i, o));
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
    let s = {
      body: JSON.stringify(t),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf+tex"
      }
    };
    return this.http.fetch(o, s).then((n) => this.processGenerateInvoice(n));
  }
  processGenerateInvoice(e) {
    const t = e.status;
    let o = {};
    if (e.headers && e.headers.forEach && e.headers.forEach((i, s) => o[s] = i), t === 200 || t === 206) {
      const i = e.headers ? e.headers.get("content-disposition") : void 0;
      let s = i ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(i) : void 0, n = s && s.length > 1 ? s[3] || s[2] : void 0;
      return n ? n = decodeURIComponent(n) : (s = i ? /filename="?([^"]*?)"?(;|$)/g.exec(i) : void 0, n = s && s.length > 1 ? s[1] : void 0), e.blob().then((m) => ({ fileName: n, data: m, status: t, headers: o }));
    } else {
      if (t === 422)
        return e.text().then((i) => {
          let s = null, n = i === "" ? null : JSON.parse(i, this.jsonParseReviver);
          return s = g.fromJS(n), u("Validation Failed", t, i, o, s);
        });
      if (t === 500)
        return e.text().then((i) => {
          let s = null, n = i === "" ? null : JSON.parse(i, this.jsonParseReviver);
          return s = J.fromJS(n), u("Internal Server Error", t, i, o, s);
        });
      if (t !== 200 && t !== 204)
        return e.text().then((i) => u("An unexpected server error occurred.", t, i, o));
    }
    return Promise.resolve(null);
  }
}
class g {
  constructor(e) {
    r(this, "message");
    r(this, "details");
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
    let t = new g();
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
class J {
  constructor(e) {
    r(this, "message");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
  }
  init(e) {
    e && (this.message = e.message);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new J();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.message = this.message, e;
  }
}
class y {
  constructor(e) {
    r(this, "name");
    r(this, "amount");
    r(this, "reference");
    r(this, "date");
    r(this, "debtorNumber");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
  }
  init(e) {
    e && (this.name = e.name, this.amount = e.amount, this.reference = e.reference, this.date = e.date ? new Date(e.date.toString()) : void 0, this.debtorNumber = e.debtorNumber);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new y();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.name = this.name, e.amount = this.amount, e.reference = this.reference, e.date = this.date ? this.date.toISOString() : void 0, e.debtorNumber = this.debtorNumber, e;
  }
}
class O {
  constructor(e) {
    r(this, "writeOff");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.writeOff = new y());
  }
  init(e) {
    e && (this.writeOff = e.writeOff ? y.fromJS(e.writeOff) : new y());
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new O();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.writeOff = this.writeOff ? this.writeOff.toJSON() : void 0, e;
  }
}
var q = /* @__PURE__ */ ((c) => (c.DUTCH = "DUTCH", c.ENGLISH = "ENGLISH", c))(q || {}), W = /* @__PURE__ */ ((c) => (c.PDF = "PDF", c.TEX = "TEX", c))(W || {});
class f {
  constructor(e) {
    r(this, "name");
    r(this, "language");
    r(this, "fileType");
    r(this, "stationery");
    r(this, "createdAt");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
  }
  init(e) {
    e && (this.name = e.name, this.language = e.language, this.fileType = e.fileType, this.stationery = e.stationery, this.createdAt = e.createdAt ? new Date(e.createdAt.toString()) : void 0);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new f();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.name = this.name, e.language = this.language, e.fileType = this.fileType, e.stationery = this.stationery, e.createdAt = this.createdAt ? this.createdAt.toISOString() : void 0, e;
  }
}
class x {
  constructor(e) {
    r(this, "params");
    r(this, "settings");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.params = new O(), this.settings = new f());
  }
  init(e) {
    e && (this.params = e.params ? O.fromJS(e.params) : new O(), this.settings = e.settings ? f.fromJS(e.settings) : new f());
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
var L = /* @__PURE__ */ ((c) => (c.ZERO = "ZERO", c.LOW = "LOW", c.HIGH = "HIGH", c))(L || {});
class N {
  constructor(e) {
    r(this, "basePrice");
    r(this, "discount");
    r(this, "vatAmount");
    r(this, "vatCategory");
    r(this, "quantity");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
  }
  init(e) {
    e && (this.basePrice = e.basePrice, this.discount = e.discount, this.vatAmount = e.vatAmount, this.vatCategory = e.vatCategory, this.quantity = e.quantity);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new N();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.basePrice = this.basePrice, e.discount = this.discount, e.vatAmount = this.vatAmount, e.vatCategory = this.vatCategory, e.quantity = this.quantity, e;
  }
}
class w {
  constructor(e) {
    r(this, "name");
    r(this, "details");
    r(this, "summary");
    r(this, "specification");
    r(this, "pricing");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.pricing = new N());
  }
  init(e) {
    e && (this.name = e.name, this.details = e.details, this.summary = e.summary, this.specification = e.specification, this.pricing = e.pricing ? N.fromJS(e.pricing) : new N());
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new w();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.name = this.name, e.details = this.details, e.summary = this.summary, e.specification = this.specification, e.pricing = this.pricing ? this.pricing.toJSON() : void 0, e;
  }
}
class l {
  constructor(e) {
    r(this, "exclVat");
    r(this, "lowVat");
    r(this, "highVat");
    r(this, "inclVat");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
  }
  init(e) {
    e && (this.exclVat = e.exclVat, this.lowVat = e.lowVat, this.highVat = e.highVat, this.inclVat = e.inclVat);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new l();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.exclVat = this.exclVat, e.lowVat = this.lowVat, e.highVat = this.highVat, e.inclVat = this.inclVat, e;
  }
}
class b {
  constructor(e) {
    r(this, "startDate");
    r(this, "endDate");
    r(this, "fines");
    r(this, "total");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.fines = [], this.total = new l());
  }
  init(e) {
    if (e) {
      if (this.startDate = e.startDate ? new Date(e.startDate.toString()) : void 0, this.endDate = e.endDate ? new Date(e.endDate.toString()) : void 0, Array.isArray(e.fines)) {
        this.fines = [];
        for (let t of e.fines)
          this.fines.push(w.fromJS(t));
      }
      this.total = e.total ? l.fromJS(e.total) : new l();
    }
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new b();
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
class V {
  constructor(e) {
    r(this, "params");
    r(this, "settings");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.params = new b(), this.settings = new f());
  }
  init(e) {
    e && (this.params = e.params ? b.fromJS(e.params) : new b(), this.settings = e.settings ? f.fromJS(e.settings) : new f());
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
class h {
  constructor(e) {
    r(this, "firstName");
    r(this, "lastNamePreposition");
    r(this, "lastName");
    r(this, "fullName");
    r(this, "function");
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
class D {
  constructor(e) {
    r(this, "startDate");
    r(this, "endDate");
    r(this, "entries");
    r(this, "total");
    r(this, "description");
    r(this, "account");
    r(this, "type");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.entries = [], this.total = new l(), this.account = new h());
  }
  init(e) {
    if (e) {
      if (this.startDate = e.startDate ? new Date(e.startDate.toString()) : void 0, this.endDate = e.endDate ? new Date(e.endDate.toString()) : void 0, Array.isArray(e.entries)) {
        this.entries = [];
        for (let t of e.entries)
          this.entries.push(w.fromJS(t));
      }
      this.total = e.total ? l.fromJS(e.total) : new l(), this.description = e.description, this.account = e.account ? h.fromJS(e.account) : new h(), this.type = e.type;
    }
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new D();
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
class U {
  constructor(e) {
    r(this, "params");
    r(this, "settings");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.params = new D(), this.settings = new f());
  }
  init(e) {
    e && (this.params = e.params ? D.fromJS(e.params) : new D(), this.settings = e.settings ? f.fromJS(e.settings) : new f());
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
class j {
  constructor(e) {
    r(this, "bankAccountName");
    r(this, "bankAccountNumber");
    r(this, "amount");
    r(this, "reference");
    r(this, "date");
    r(this, "debtorNumber");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
  }
  init(e) {
    e && (this.bankAccountName = e.bankAccountName, this.bankAccountNumber = e.bankAccountNumber, this.amount = e.amount, this.reference = e.reference, this.date = e.date ? new Date(e.date.toString()) : void 0, this.debtorNumber = e.debtorNumber);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new j();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.bankAccountName = this.bankAccountName, e.bankAccountNumber = this.bankAccountNumber, e.amount = this.amount, e.reference = this.reference, e.date = this.date ? this.date.toISOString() : void 0, e.debtorNumber = this.debtorNumber, e;
  }
}
class P {
  constructor(e) {
    r(this, "payout");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.payout = new j());
  }
  init(e) {
    e && (this.payout = e.payout ? j.fromJS(e.payout) : new j());
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new P();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.payout = this.payout ? this.payout.toJSON() : void 0, e;
  }
}
class G {
  constructor(e) {
    r(this, "params");
    r(this, "settings");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.params = new P(), this.settings = new f());
  }
  init(e) {
    e && (this.params = e.params ? P.fromJS(e.params) : new P(), this.settings = e.settings ? f.fromJS(e.settings) : new f());
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new G();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.params = this.params ? this.params.toJSON() : void 0, e.settings = this.settings ? this.settings.toJSON() : void 0, e;
  }
}
class A {
  constructor(e) {
    r(this, "startDate");
    r(this, "endDate");
    r(this, "entries");
    r(this, "total");
    r(this, "description");
    r(this, "reference");
    r(this, "debtorId");
    r(this, "account");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.entries = [], this.total = new l(), this.account = new h());
  }
  init(e) {
    if (e) {
      if (this.startDate = e.startDate ? new Date(e.startDate.toString()) : void 0, this.endDate = e.endDate ? new Date(e.endDate.toString()) : void 0, Array.isArray(e.entries)) {
        this.entries = [];
        for (let t of e.entries)
          this.entries.push(w.fromJS(t));
      }
      this.total = e.total ? l.fromJS(e.total) : new l(), this.description = e.description, this.reference = e.reference, this.debtorId = e.debtorId, this.account = e.account ? h.fromJS(e.account) : new h();
    }
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new A();
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
class k {
  constructor(e) {
    r(this, "params");
    r(this, "settings");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.params = new A(), this.settings = new f());
  }
  init(e) {
    e && (this.params = e.params ? A.fromJS(e.params) : new A(), this.settings = e.settings ? f.fromJS(e.settings) : new f());
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
var X = /* @__PURE__ */ ((c) => (c.Contract = "contract", c.Quote = "quote", c))(X || {});
class S {
  constructor(e) {
    r(this, "date");
    r(this, "dueDate");
    r(this, "dueDays");
    r(this, "startDate");
    r(this, "endDate");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
  }
  init(e) {
    e && (this.date = e.date ? new Date(e.date.toString()) : void 0, this.dueDate = e.dueDate ? new Date(e.dueDate.toString()) : void 0, this.dueDays = e.dueDays, this.startDate = e.startDate ? new Date(e.startDate.toString()) : void 0, this.endDate = e.endDate ? new Date(e.endDate.toString()) : void 0);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new S();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.date = this.date ? this.date.toISOString() : void 0, e.dueDate = this.dueDate ? this.dueDate.toISOString() : void 0, e.dueDays = this.dueDays, e.startDate = this.startDate ? this.startDate.toISOString() : void 0, e.endDate = this.endDate ? this.endDate.toISOString() : void 0, e;
  }
}
class p {
  constructor(e) {
    r(this, "name");
    r(this, "id");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
  }
  init(e) {
    e && (this.name = e.name, this.id = e.id);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new p();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.name = this.name, e.id = this.id, e;
  }
}
class v {
  constructor(e) {
    r(this, "street");
    r(this, "postalCode");
    r(this, "city");
    r(this, "country");
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
class C {
  constructor(e) {
    r(this, "ourReference");
    r(this, "yourReference");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
  }
  init(e) {
    e && (this.ourReference = e.ourReference, this.yourReference = e.yourReference);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new C();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.ourReference = this.ourReference, e.yourReference = this.yourReference, e;
  }
}
class R {
  constructor(e) {
    r(this, "subject");
    r(this, "sender");
    r(this, "recipient");
    r(this, "dates");
    r(this, "company");
    r(this, "address");
    r(this, "reference");
    r(this, "products");
    r(this, "pricing");
    r(this, "firstSignee");
    r(this, "secondSignee");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.sender = new h(), this.recipient = new h(), this.dates = new S(), this.company = new p(), this.address = new v(), this.products = [], this.pricing = new l(), this.firstSignee = new h(), this.secondSignee = new h());
  }
  init(e) {
    if (e) {
      if (this.subject = e.subject, this.sender = e.sender ? h.fromJS(e.sender) : new h(), this.recipient = e.recipient ? h.fromJS(e.recipient) : new h(), this.dates = e.dates ? S.fromJS(e.dates) : new S(), this.company = e.company ? p.fromJS(e.company) : new p(), this.address = e.address ? v.fromJS(e.address) : new v(), this.reference = e.reference ? C.fromJS(e.reference) : void 0, Array.isArray(e.products)) {
        this.products = [];
        for (let t of e.products)
          this.products.push(w.fromJS(t));
      }
      this.pricing = e.pricing ? l.fromJS(e.pricing) : new l(), this.firstSignee = e.firstSignee ? h.fromJS(e.firstSignee) : new h(), this.secondSignee = e.secondSignee ? h.fromJS(e.secondSignee) : new h();
    }
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new R();
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
class $ {
  constructor(e) {
    r(this, "params");
    r(this, "settings");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.params = new R(), this.settings = new f());
  }
  init(e) {
    e && (this.params = e.params ? R.fromJS(e.params) : new R(), this.settings = e.settings ? f.fromJS(e.settings) : new f());
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new $();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.params = this.params ? this.params.toJSON() : void 0, e.settings = this.settings ? this.settings.toJSON() : void 0, e;
  }
}
var Z = /* @__PURE__ */ ((c) => (c.Invoice = "invoice", c.Weeklysales = "weeklysales", c.Creditnota = "creditnota", c))(Z || {});
class E {
  constructor(e) {
    r(this, "ourReference");
    r(this, "yourReference");
    r(this, "costCenter");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
  }
  init(e) {
    e && (this.ourReference = e.ourReference, this.yourReference = e.yourReference, this.costCenter = e.costCenter);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new E();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.ourReference = this.ourReference, e.yourReference = this.yourReference, e.costCenter = this.costCenter, e;
  }
}
class F {
  constructor(e) {
    r(this, "products");
    r(this, "pricing");
    r(this, "subject");
    r(this, "sender");
    r(this, "recipient");
    r(this, "dates");
    r(this, "company");
    r(this, "address");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.products = [], this.pricing = new l(), this.sender = new h(), this.recipient = new h(), this.dates = new S(), this.company = new p(), this.address = new v());
  }
  init(e) {
    if (e) {
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
      if (Array.isArray(e.products)) {
        this.products = [];
        for (let o of e.products)
          this.products.push(w.fromJS(o));
      }
      this.pricing = e.pricing ? l.fromJS(e.pricing) : new l(), this.subject = e.subject, this.sender = e.sender ? h.fromJS(e.sender) : new h(), this.recipient = e.recipient ? h.fromJS(e.recipient) : new h(), this.dates = e.dates ? S.fromJS(e.dates) : new S(), this.company = e.company ? p.fromJS(e.company) : new p(), this.address = e.address ? v.fromJS(e.address) : new v();
    }
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new F();
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
class I {
  constructor(e) {
    r(this, "products");
    r(this, "pricing");
    r(this, "subject");
    r(this, "sender");
    r(this, "recipient");
    r(this, "dates");
    r(this, "company");
    r(this, "address");
    r(this, "summarizedProducts");
    r(this, "reference");
    r(this, "description");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.products = [], this.pricing = new l(), this.sender = new h(), this.recipient = new h(), this.dates = new S(), this.company = new p(), this.address = new v());
  }
  init(e) {
    if (e) {
      if (Array.isArray(e.products)) {
        this.products = [];
        for (let t of e.products)
          this.products.push(w.fromJS(t));
      }
      if (this.pricing = e.pricing ? l.fromJS(e.pricing) : new l(), this.subject = e.subject, this.sender = e.sender ? h.fromJS(e.sender) : new h(), this.recipient = e.recipient ? h.fromJS(e.recipient) : new h(), this.dates = e.dates ? S.fromJS(e.dates) : new S(), this.company = e.company ? p.fromJS(e.company) : new p(), this.address = e.address ? v.fromJS(e.address) : new v(), Array.isArray(e.summarizedProducts)) {
        this.summarizedProducts = [];
        for (let t of e.summarizedProducts)
          this.summarizedProducts.push(w.fromJS(t));
      }
      this.reference = e.reference ? E.fromJS(e.reference) : void 0, this.description = e.description;
    }
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new I();
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
class z {
  constructor(e) {
    r(this, "params");
    r(this, "settings");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.params = new I(), this.settings = new f());
  }
  init(e) {
    e && (this.params = e.params ? I.fromJS(e.params) : new I(), this.settings = e.settings ? f.fromJS(e.settings) : new f());
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new z();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.params = this.params ? this.params.toJSON() : void 0, e.settings = this.settings ? this.settings.toJSON() : void 0, e;
  }
}
var Q = /* @__PURE__ */ ((c) => (c.Validation_failed = "Validation failed", c))(Q || {}), B = /* @__PURE__ */ ((c) => (c.Internal_Server_Error = "Internal Server Error", c))(B || {}), K = /* @__PURE__ */ ((c) => (c.Sales = "sales", c.Purchases = "purchases", c))(K || {});
class Y extends Error {
  constructor(t, o, i, s, n) {
    super();
    r(this, "message");
    r(this, "status");
    r(this, "response");
    r(this, "headers");
    r(this, "result");
    r(this, "isApiException", !0);
    this.message = t, this.status = o, this.response = i, this.headers = s, this.result = n;
  }
  static isApiException(t) {
    return t.isApiException === !0;
  }
}
function u(c, e, t, o, i) {
  throw i ?? new Y(c, e, t, o, null);
}
export {
  v as Address,
  Y as ApiException,
  d as Client,
  p as Company,
  R as ContractParameters,
  $ as ContractRouteParams,
  X as ContractType,
  S as Dates,
  f as FileSettings,
  b as FineReportParameters,
  V as FineRouteParams,
  h as Identity,
  J as InternalError,
  B as InternalErrorMessage,
  I as InvoiceParameters,
  E as InvoiceReferences,
  z as InvoiceRouteParams,
  Z as InvoiceType,
  q as Language,
  j as Payout,
  P as PayoutParameters,
  G as PayoutRouteParams,
  w as Product,
  N as ProductPricing,
  F as Reference__,
  C as References,
  W as ReturnFileType,
  A as SellerPayoutParameters,
  k as SellerPayoutRouteParams,
  l as TotalPricing,
  D as UserReportParameters,
  K as UserReportParametersType,
  U as UserRouteParams,
  L as VAT,
  g as ValidateErrorJSON,
  Q as ValidateErrorJSONMessage,
  y as WriteOff,
  O as WriteOffParameters,
  x as WriteOffRouteParams
};
