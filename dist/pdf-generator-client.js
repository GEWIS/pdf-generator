var V = Object.defineProperty;
var k = (c, e, t) => e in c ? V(c, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : c[e] = t;
var i = (c, e, t) => (k(c, typeof e != "symbol" ? e + "" : e, t), t);
class W {
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
    let n = {};
    if (e.headers && e.headers.forEach && e.headers.forEach((s, r) => n[r] = s), t === 200 || t === 206) {
      const s = e.headers ? e.headers.get("content-disposition") : void 0;
      let r = s ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(s) : void 0, o = r && r.length > 1 ? r[3] || r[2] : void 0;
      return o ? o = decodeURIComponent(o) : (r = s ? /filename="?([^"]*?)"?(;|$)/g.exec(s) : void 0, o = r && r.length > 1 ? r[1] : void 0), e.blob().then((g) => ({ fileName: o, data: g, status: t, headers: n }));
    } else {
      if (t === 422)
        return e.text().then((s) => {
          let r = null, o = s === "" ? null : JSON.parse(s, this.jsonParseReviver);
          return r = y.fromJS(o), l("Validation Failed", t, s, n, r);
        });
      if (t === 500)
        return e.text().then((s) => {
          let r = null, o = s === "" ? null : JSON.parse(s, this.jsonParseReviver);
          return r = J.fromJS(o), l("Internal Server Error", t, s, n, r);
        });
      if (t !== 200 && t !== 204)
        return e.text().then((s) => l("An unexpected server error occurred.", t, s, n));
    }
    return Promise.resolve(null);
  }
  /**
   * @return Ok
   */
  generatePayout(e) {
    let t = this.baseUrl + "/payout";
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
    let n = {};
    if (e.headers && e.headers.forEach && e.headers.forEach((s, r) => n[r] = s), t === 200 || t === 206) {
      const s = e.headers ? e.headers.get("content-disposition") : void 0;
      let r = s ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(s) : void 0, o = r && r.length > 1 ? r[3] || r[2] : void 0;
      return o ? o = decodeURIComponent(o) : (r = s ? /filename="?([^"]*?)"?(;|$)/g.exec(s) : void 0, o = r && r.length > 1 ? r[1] : void 0), e.blob().then((g) => ({ fileName: o, data: g, status: t, headers: n }));
    } else {
      if (t === 422)
        return e.text().then((s) => {
          let r = null, o = s === "" ? null : JSON.parse(s, this.jsonParseReviver);
          return r = y.fromJS(o), l("Validation Failed", t, s, n, r);
        });
      if (t === 500)
        return e.text().then((s) => {
          let r = null, o = s === "" ? null : JSON.parse(s, this.jsonParseReviver);
          return r = J.fromJS(o), l("Internal Server Error", t, s, n, r);
        });
      if (t !== 200 && t !== 204)
        return e.text().then((s) => l("An unexpected server error occurred.", t, s, n));
    }
    return Promise.resolve(null);
  }
  /**
   * @return Ok
   */
  generateContract(e, t) {
    let n = this.baseUrl + "/contract/{type}";
    if (e == null)
      throw new Error("The parameter 'type' must be defined.");
    n = n.replace("{type}", encodeURIComponent("" + e)), n = n.replace(/[?&]$/, "");
    let r = {
      body: JSON.stringify(t),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf+tex"
      }
    };
    return this.http.fetch(n, r).then((o) => this.processGenerateContract(o));
  }
  processGenerateContract(e) {
    const t = e.status;
    let n = {};
    if (e.headers && e.headers.forEach && e.headers.forEach((s, r) => n[r] = s), t === 200 || t === 206) {
      const s = e.headers ? e.headers.get("content-disposition") : void 0;
      let r = s ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(s) : void 0, o = r && r.length > 1 ? r[3] || r[2] : void 0;
      return o ? o = decodeURIComponent(o) : (r = s ? /filename="?([^"]*?)"?(;|$)/g.exec(s) : void 0, o = r && r.length > 1 ? r[1] : void 0), e.blob().then((g) => ({ fileName: o, data: g, status: t, headers: n }));
    } else {
      if (t === 422)
        return e.text().then((s) => {
          let r = null, o = s === "" ? null : JSON.parse(s, this.jsonParseReviver);
          return r = y.fromJS(o), l("Validation Failed", t, s, n, r);
        });
      if (t === 500)
        return e.text().then((s) => {
          let r = null, o = s === "" ? null : JSON.parse(s, this.jsonParseReviver);
          return r = J.fromJS(o), l("Internal Server Error", t, s, n, r);
        });
      if (t !== 200 && t !== 204)
        return e.text().then((s) => l("An unexpected server error occurred.", t, s, n));
    }
    return Promise.resolve(null);
  }
  /**
   * @return Ok
   */
  generateInvoice(e, t) {
    let n = this.baseUrl + "/invoice/{type}";
    if (e == null)
      throw new Error("The parameter 'type' must be defined.");
    n = n.replace("{type}", encodeURIComponent("" + e)), n = n.replace(/[?&]$/, "");
    let r = {
      body: JSON.stringify(t),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf+tex"
      }
    };
    return this.http.fetch(n, r).then((o) => this.processGenerateInvoice(o));
  }
  processGenerateInvoice(e) {
    const t = e.status;
    let n = {};
    if (e.headers && e.headers.forEach && e.headers.forEach((s, r) => n[r] = s), t === 200 || t === 206) {
      const s = e.headers ? e.headers.get("content-disposition") : void 0;
      let r = s ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(s) : void 0, o = r && r.length > 1 ? r[3] || r[2] : void 0;
      return o ? o = decodeURIComponent(o) : (r = s ? /filename="?([^"]*?)"?(;|$)/g.exec(s) : void 0, o = r && r.length > 1 ? r[1] : void 0), e.blob().then((g) => ({ fileName: o, data: g, status: t, headers: n }));
    } else {
      if (t === 422)
        return e.text().then((s) => {
          let r = null, o = s === "" ? null : JSON.parse(s, this.jsonParseReviver);
          return r = y.fromJS(o), l("Validation Failed", t, s, n, r);
        });
      if (t === 500)
        return e.text().then((s) => {
          let r = null, o = s === "" ? null : JSON.parse(s, this.jsonParseReviver);
          return r = J.fromJS(o), l("Internal Server Error", t, s, n, r);
        });
      if (t !== 200 && t !== 204)
        return e.text().then((s) => l("An unexpected server error occurred.", t, s, n));
    }
    return Promise.resolve(null);
  }
}
class y {
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
    let t = new y();
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
    let t = new J();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.message = this.message, e;
  }
}
var U = /* @__PURE__ */ ((c) => (c.ZERO = "ZERO", c.LOW = "LOW", c.HIGH = "HIGH", c))(U || {});
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
class v {
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
    let t = new v();
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
class N {
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
          this.fines.push(v.fromJS(t));
      }
      this.total = e.total ? f.fromJS(e.total) : new f();
    }
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new N();
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
var G = /* @__PURE__ */ ((c) => (c.DUTCH = "DUTCH", c.ENGLISH = "ENGLISH", c))(G || {}), z = /* @__PURE__ */ ((c) => (c.PDF = "PDF", c.TEX = "TEX", c))(z || {});
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
class R {
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
    let t = new R();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.params = this.params ? this.params.toJSON() : void 0, e.settings = this.settings ? this.settings.toJSON() : void 0, e;
  }
}
class O {
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
    let t = new O();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.bankAccountName = this.bankAccountName, e.bankAccountNumber = this.bankAccountNumber, e.amount = this.amount, e.reference = this.reference, e.date = this.date ? this.date.toISOString() : void 0, e.debtorNumber = this.debtorNumber, e;
  }
}
class b {
  constructor(e) {
    i(this, "payout");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.payout = new O());
  }
  init(e) {
    e && (this.payout = e.payout ? O.fromJS(e.payout) : new O());
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new b();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.payout = this.payout ? this.payout.toJSON() : void 0, e;
  }
}
class C {
  constructor(e) {
    i(this, "params");
    i(this, "settings");
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.params = new b(), this.settings = new u());
  }
  init(e) {
    e && (this.params = e.params ? b.fromJS(e.params) : new b(), this.settings = e.settings ? u.fromJS(e.settings) : new u());
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
var F = /* @__PURE__ */ ((c) => (c.Contract = "contract", c.Quote = "quote", c))(F || {});
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
class m {
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
    let t = new m();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.date = this.date ? this.date.toISOString() : void 0, e.dueDate = this.dueDate ? this.dueDate.toISOString() : void 0, e.dueDays = this.dueDays, e.startDate = this.startDate ? this.startDate.toISOString() : void 0, e.endDate = this.endDate ? this.endDate.toISOString() : void 0, e;
  }
}
class p {
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
    let t = new p();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.name = this.name, e.id = this.id, e;
  }
}
class S {
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
    let t = new S();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.street = this.street, e.postalCode = this.postalCode, e.city = this.city, e.country = this.country, e;
  }
}
class D {
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
    let t = new D();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.ourReference = this.ourReference, e.yourReference = this.yourReference, e;
  }
}
class j {
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
    e || (this.sender = new h(), this.recipient = new h(), this.dates = new m(), this.company = new p(), this.address = new S(), this.products = [], this.pricing = new f(), this.firstSignee = new h(), this.secondSignee = new h());
  }
  init(e) {
    if (e) {
      if (this.subject = e.subject, this.sender = e.sender ? h.fromJS(e.sender) : new h(), this.recipient = e.recipient ? h.fromJS(e.recipient) : new h(), this.dates = e.dates ? m.fromJS(e.dates) : new m(), this.company = e.company ? p.fromJS(e.company) : new p(), this.address = e.address ? S.fromJS(e.address) : new S(), this.reference = e.reference ? D.fromJS(e.reference) : void 0, Array.isArray(e.products)) {
        this.products = [];
        for (let t of e.products)
          this.products.push(v.fromJS(t));
      }
      this.pricing = e.pricing ? f.fromJS(e.pricing) : new f(), this.firstSignee = e.firstSignee ? h.fromJS(e.firstSignee) : new h(), this.secondSignee = e.secondSignee ? h.fromJS(e.secondSignee) : new h();
    }
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new j();
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
class E {
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
    let t = new E();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.params = this.params ? this.params.toJSON() : void 0, e.settings = this.settings ? this.settings.toJSON() : void 0, e;
  }
}
var H = /* @__PURE__ */ ((c) => (c.Invoice = "invoice", c.Weeklysales = "weeklysales", c.Creditnota = "creditnota", c))(H || {});
class A {
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
    let t = new A();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.ourReference = this.ourReference, e.yourReference = this.yourReference, e.costCenter = this.costCenter, e;
  }
}
class I {
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
    e || (this.products = [], this.pricing = new f(), this.sender = new h(), this.recipient = new h(), this.dates = new m(), this.company = new p(), this.address = new S());
  }
  init(e) {
    if (e) {
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
      if (Array.isArray(e.products)) {
        this.products = [];
        for (let n of e.products)
          this.products.push(v.fromJS(n));
      }
      this.pricing = e.pricing ? f.fromJS(e.pricing) : new f(), this.subject = e.subject, this.sender = e.sender ? h.fromJS(e.sender) : new h(), this.recipient = e.recipient ? h.fromJS(e.recipient) : new h(), this.dates = e.dates ? m.fromJS(e.dates) : new m(), this.company = e.company ? p.fromJS(e.company) : new p(), this.address = e.address ? S.fromJS(e.address) : new S();
    }
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new I();
    return t.init(e), t;
  }
  toJSON(e) {
    e = typeof e == "object" ? e : {};
    for (var t in this)
      this.hasOwnProperty(t) && (e[t] = this[t]);
    if (Array.isArray(this.products)) {
      e.products = [];
      for (let n of this.products)
        e.products.push(n.toJSON());
    }
    return e.pricing = this.pricing ? this.pricing.toJSON() : void 0, e.subject = this.subject, e.sender = this.sender ? this.sender.toJSON() : void 0, e.recipient = this.recipient ? this.recipient.toJSON() : void 0, e.dates = this.dates ? this.dates.toJSON() : void 0, e.company = this.company ? this.company.toJSON() : void 0, e.address = this.address ? this.address.toJSON() : void 0, e;
  }
}
class P {
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
    if (e)
      for (var t in e)
        e.hasOwnProperty(t) && (this[t] = e[t]);
    e || (this.products = [], this.pricing = new f(), this.sender = new h(), this.recipient = new h(), this.dates = new m(), this.company = new p(), this.address = new S());
  }
  init(e) {
    if (e) {
      if (Array.isArray(e.products)) {
        this.products = [];
        for (let t of e.products)
          this.products.push(v.fromJS(t));
      }
      if (this.pricing = e.pricing ? f.fromJS(e.pricing) : new f(), this.subject = e.subject, this.sender = e.sender ? h.fromJS(e.sender) : new h(), this.recipient = e.recipient ? h.fromJS(e.recipient) : new h(), this.dates = e.dates ? m.fromJS(e.dates) : new m(), this.company = e.company ? p.fromJS(e.company) : new p(), this.address = e.address ? S.fromJS(e.address) : new S(), Array.isArray(e.summarizedProducts)) {
        this.summarizedProducts = [];
        for (let t of e.summarizedProducts)
          this.summarizedProducts.push(v.fromJS(t));
      }
      this.reference = e.reference ? A.fromJS(e.reference) : void 0;
    }
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let t = new P();
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
    return e.reference = this.reference ? this.reference.toJSON() : void 0, e;
  }
}
class x {
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
    let t = new x();
    return t.init(e), t;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.params = this.params ? this.params.toJSON() : void 0, e.settings = this.settings ? this.settings.toJSON() : void 0, e;
  }
}
var $ = /* @__PURE__ */ ((c) => (c.Validation_failed = "Validation failed", c))($ || {}), q = /* @__PURE__ */ ((c) => (c.Internal_Server_Error = "Internal Server Error", c))(q || {});
class M extends Error {
  constructor(t, n, s, r, o) {
    super();
    i(this, "message");
    i(this, "status");
    i(this, "response");
    i(this, "headers");
    i(this, "result");
    i(this, "isApiException", !0);
    this.message = t, this.status = n, this.response = s, this.headers = r, this.result = o;
  }
  static isApiException(t) {
    return t.isApiException === !0;
  }
}
function l(c, e, t, n, s) {
  throw s ?? new M(c, e, t, n, null);
}
export {
  S as Address,
  M as ApiException,
  W as Client,
  p as Company,
  j as ContractParameters,
  E as ContractRouteParams,
  F as ContractType,
  m as Dates,
  u as FileSettings,
  N as FineReportParameters,
  R as FineRouteParams,
  h as Identity,
  J as InternalError,
  q as InternalErrorMessage,
  P as InvoiceParameters,
  A as InvoiceReferences,
  x as InvoiceRouteParams,
  H as InvoiceType,
  G as Language,
  O as Payout,
  b as PayoutParameters,
  C as PayoutRouteParams,
  v as Product,
  w as ProductPricing,
  I as Reference__,
  D as References,
  z as ReturnFileType,
  f as TotalPricing,
  U as VAT,
  y as ValidateErrorJSON,
  $ as ValidateErrorJSONMessage
};
