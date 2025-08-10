System.register("aaBMkGO4J2InY9M2VbZp", ["react", "react-dom", "vev"], function (exports) {
  "use strict";
  var global = {};
  const ReactDOM = {};
  var ReactRouterDOM = {};
  var Vev = {};
  var Silke = {};
  return {
    setters: [
      function (module) {},
      function (module) {
        Object.assign(ReactDOM, module);
      },
      function (module) {
        Vev.registerVevComponent = () => undefined;
        
      },
    ],
    execute: function () {
      var packageBuild = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // globals:react
  var require_react = __commonJS({
    "globals:react"(exports, module) {
      module.exports = React;
    }
  });

  // globals:@vev/react
  var require_react2 = __commonJS({
    "globals:@vev/react"(exports, module) {
      module.exports = Vev;
    }
  });

  // src/____index.js
  var index_exports = {};
  __export(index_exports, {
    InstagramFollow: () => InstagramFollow_default2
  });

  // src/InstagramFollow.jsx
  var import_react = __toESM(require_react());
  var import_react2 = __toESM(require_react2());

  // src/InstagramFollow.module.css
  var InstagramFollow_default = { "widget": "widget__InstagramFollow", "vertical": "vertical__InstagramFollow", "content": "content__InstagramFollow", "compact": "compact__InstagramFollow", "profilePic": "profilePic__InstagramFollow", "profilePlaceholder": "profilePlaceholder__InstagramFollow", "username": "username__InstagramFollow", "followButton": "followButton__InstagramFollow", "profileSection": "profileSection__InstagramFollow", "textSection": "textSection__InstagramFollow", "verified": "verified__InstagramFollow", "fullName": "fullName__InstagramFollow", "followers": "followers__InstagramFollow", "errorText": "errorText__InstagramFollow", "loadingText": "loadingText__InstagramFollow", "spinner": "spinner__InstagramFollow", "spin": "spin__InstagramFollow", "placeholder": "placeholder__InstagramFollow", "placeholderIcon": "placeholderIcon__InstagramFollow", "placeholderText": "placeholderText__InstagramFollow", "horizontal": "horizontal__InstagramFollow" };

  // src/InstagramFollow.jsx
  var InstagramFollow = /* @__PURE__ */ __name(({
    username = "",
    ctaText = "F\xF8lg oss p\xE5 Instagram",
    showFollowerCount = true,
    showProfilePicture = true,
    displayStyle = "horizontal",
    backgroundColor = "#FFFFFF",
    buttonColor = "#E4405F",
    buttonTextColor = "#FFFFFF",
    textColor = "#000000",
    borderRadius = 12,
    apiEndpoint = "https://vev-instagram-jgw391ida-nesemedias-projects.vercel.app/api/instagram"
  }) => {
    const [profile, setProfile] = (0, import_react.useState)(null);
    const [loading, setLoading] = (0, import_react.useState)(false);
    const [error, setError] = (0, import_react.useState)(null);
    (0, import_react.useEffect)(() => {
      if (!username) {
        setProfile(null);
        setError(null);
        return;
      }
      const fetchProfile = /* @__PURE__ */ __name(async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`${apiEndpoint}?username=${username}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setProfile(data);
        } catch (err) {
          console.error("Error fetching Instagram profile:", err);
          setError("Kunne ikke hente profil");
          setProfile({
            username,
            profileUrl: `https://www.instagram.com/${username}/`,
            success: false
          });
        } finally {
          setLoading(false);
        }
      }, "fetchProfile");
      const timeoutId = setTimeout(fetchProfile, 500);
      return () => clearTimeout(timeoutId);
    }, [username, apiEndpoint]);
    const handleFollowClick = /* @__PURE__ */ __name(() => {
      if (!username)
        return;
      if (typeof gtag !== "undefined") {
        gtag("event", "instagram_follow_click", {
          username,
          event_category: "social"
        });
      }
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const profileUrl = `https://www.instagram.com/${username}/`;
      if (isMobile) {
        const appUrl = `instagram://user?username=${username}`;
        window.location.href = appUrl;
        setTimeout(() => {
          window.open(profileUrl, "_blank", "noopener,noreferrer");
        }, 1500);
      } else {
        window.open(profileUrl, "_blank", "noopener,noreferrer");
      }
    }, "handleFollowClick");
    const formatFollowerCount = /* @__PURE__ */ __name((count) => {
      if (!count || count === "0")
        return "";
      const num = parseInt(count);
      if (num >= 1e6) {
        return `${(num / 1e6).toFixed(1)}M f\xF8lgere`;
      } else if (num >= 1e3) {
        return `${(num / 1e3).toFixed(1)}k f\xF8lgere`;
      }
      return `${num.toLocaleString()} f\xF8lgere`;
    }, "formatFollowerCount");
    if (!username) {
      return /* @__PURE__ */ import_react.default.createElement("div", { className: InstagramFollow_default.placeholder, style: { borderRadius: `${borderRadius}px` } }, /* @__PURE__ */ import_react.default.createElement("div", { className: InstagramFollow_default.placeholderIcon }, "\u{1F4F7}"), /* @__PURE__ */ import_react.default.createElement("p", { className: InstagramFollow_default.placeholderText }, "Legg til Instagram brukernavn"));
    }
    const widgetClasses = `${InstagramFollow_default.widget} ${InstagramFollow_default[displayStyle]}`;
    return /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        className: widgetClasses,
        style: {
          backgroundColor,
          borderRadius: `${borderRadius}px`,
          color: textColor
        }
      },
      /* @__PURE__ */ import_react.default.createElement("div", { className: InstagramFollow_default.content }, showProfilePicture && /* @__PURE__ */ import_react.default.createElement("div", { className: InstagramFollow_default.profileSection }, profile?.profilePic ? /* @__PURE__ */ import_react.default.createElement(
        "img",
        {
          src: profile.profilePic,
          alt: `${username} profilbilde`,
          className: InstagramFollow_default.profilePic,
          onError: (e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }
        }
      ) : null, /* @__PURE__ */ import_react.default.createElement(
        "div",
        {
          className: InstagramFollow_default.profilePlaceholder,
          style: { display: profile?.profilePic ? "none" : "flex" }
        },
        "\u{1F4F7}"
      )), /* @__PURE__ */ import_react.default.createElement("div", { className: InstagramFollow_default.textSection }, /* @__PURE__ */ import_react.default.createElement("div", { className: InstagramFollow_default.username }, "@", username, profile?.isVerified && /* @__PURE__ */ import_react.default.createElement("span", { className: InstagramFollow_default.verified, title: "Verifisert konto" }, "\u2713")), profile?.fullName && /* @__PURE__ */ import_react.default.createElement("div", { className: InstagramFollow_default.fullName }, profile.fullName), showFollowerCount && profile?.followers && /* @__PURE__ */ import_react.default.createElement("div", { className: InstagramFollow_default.followers }, formatFollowerCount(profile.followers)), error && /* @__PURE__ */ import_react.default.createElement("div", { className: InstagramFollow_default.errorText }, error))),
      /* @__PURE__ */ import_react.default.createElement(
        "button",
        {
          onClick: handleFollowClick,
          className: InstagramFollow_default.followButton,
          style: {
            backgroundColor: buttonColor,
            color: buttonTextColor
          },
          disabled: loading
        },
        loading ? /* @__PURE__ */ import_react.default.createElement("span", { className: InstagramFollow_default.loadingText }, /* @__PURE__ */ import_react.default.createElement("span", { className: InstagramFollow_default.spinner }), "Laster...") : ctaText
      )
    );
  }, "InstagramFollow");
  (0, import_react2.registerVevComponent)(InstagramFollow, {
    name: "Instagram Follow Widget",
    props: [
      {
        name: "username",
        type: "string",
        title: "Instagram brukernavn",
        description: "Skriv brukernavnet uten @ tegn",
        initialValue: ""
      },
      {
        name: "ctaText",
        type: "string",
        title: "Knapp-tekst",
        initialValue: "F\xF8lg oss p\xE5 Instagram"
      },
      {
        name: "displayStyle",
        type: "select",
        title: "Layout-stil",
        options: {
          items: [
            { label: "Horisontal", value: "horizontal" },
            { label: "Vertikal", value: "vertical" },
            { label: "Kompakt", value: "compact" }
          ]
        },
        initialValue: "horizontal"
      },
      {
        name: "showFollowerCount",
        type: "boolean",
        title: "Vis antall f\xF8lgere",
        initialValue: true
      },
      {
        name: "showProfilePicture",
        type: "boolean",
        title: "Vis profilbilde",
        initialValue: true
      },
      {
        name: "backgroundColor",
        type: "string",
        title: "Bakgrunnsfarge",
        initialValue: "#FFFFFF"
      },
      {
        name: "buttonColor",
        type: "string",
        title: "Knapp-farge",
        initialValue: "#E4405F"
      },
      {
        name: "buttonTextColor",
        type: "string",
        title: "Knapp-tekstfarge",
        initialValue: "#FFFFFF"
      },
      {
        name: "textColor",
        type: "string",
        title: "Tekstfarge",
        initialValue: "#000000"
      },
      {
        name: "borderRadius",
        type: "number",
        title: "Hj\xF8rne-radius (px)",
        initialValue: 12,
        options: {
          min: 0,
          max: 50
        }
      },
      {
        name: "apiEndpoint",
        type: "string",
        title: "API Endpoint URL",
        description: "Din Vercel API URL",
        initialValue: "https://vev-instagram-jgw391ida-nesemedias-projects.vercel.app/api/instagram"
      }
    ],
    editableCSS: [
      {
        selector: InstagramFollow_default.widget,
        properties: ["background", "padding", "margin", "border", "box-shadow", "border-radius"]
      },
      {
        selector: InstagramFollow_default.followButton,
        properties: ["font-size", "font-weight", "padding", "border-radius", "border", "box-shadow"]
      },
      {
        selector: InstagramFollow_default.username,
        properties: ["font-size", "font-weight", "color", "font-family"]
      },
      {
        selector: InstagramFollow_default.fullName,
        properties: ["font-size", "color", "font-family", "font-weight"]
      },
      {
        selector: InstagramFollow_default.followers,
        properties: ["font-size", "color", "font-family", "opacity"]
      },
      {
        selector: InstagramFollow_default.profilePic,
        properties: ["width", "height", "border-radius", "border", "box-shadow"]
      },
      {
        selector: InstagramFollow_default.content,
        properties: ["gap", "align-items", "justify-content"]
      }
    ]
  });
  var InstagramFollow_default2 = InstagramFollow;
  return __toCommonJS(index_exports);
})();

      exports("aaBMkGO4J2InY9M2VbZp_InstagramFollow", packageBuild.InstagramFollow);
    },
  };
});
//# sourceMappingURL=http://localhost:9876/stdin.js.map