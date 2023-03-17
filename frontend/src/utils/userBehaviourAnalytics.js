var userBehaviourAnalytics = (function () {
  var defaults = {
    userEnvironment: true,
    clicks: true,
    mouseMovement: true,
    mouseMovementInterval: 1,
    mouseScroll: true,
    keyDown: true,
    keyUp: true,
    keyPress: true,
    timeCount: true,
    clearAfterProcess: true,
    processTime: 15, //seconds
    processData: function (results) {
      console.log("USER BEHAVIOUR ANALYTICS INFO");
      console.log(results);
      localStorage.setItem(
        "userBehaviourAnalyticsInfo",
        JSON.stringify(results)
      );
    },
  };
  var user_config = {};
  var analytics = {
    processInterval: null,
    mouseInterval: null,
    mousePosition: [], //x,y,timestamp
    eventListeners: {
      scroll: null,
      click: null,
      mouseMovement: null,
      keyDown: null,
      keyUp: null,
      keyPress: null,
    },
    eventsFunctions: {
      scroll: () => {
        results.mouseScroll.push([
          window.scrollX,
          window.scrollY,
          getTimeStamp(),
        ]);
      },
      click: (e) => {
        results.clicks.clickCount++;
        var path = [];
        var node = "";
        e.composedPath().forEach((el, i) => {
          if (
            i !== e.composedPath().length - 1 &&
            i !== e.composedPath().length - 2
          ) {
            node = el.localName;
            el.className !== ""
              ? el.classList.forEach((clE) => {
                  node += "." + clE;
                })
              : 0;
            el.id !== "" ? (node += "#" + el.id) : 0;
            path.push(node);
          }
        });
        path = path.reverse().join(">");
        results.clicks.clickDetails.push([
          e.clientX,
          e.clientY,
          path,
          getTimeStamp(),
        ]);
      },
      mouseMovement: (e) => {
        analytics.mousePosition = [e.clientX, e.clientY, getTimeStamp()];
      },
      keyDown: (e) => {
        results.keyLogger.keyDetails.push({
          key: e.key,
          code: e.code,
          timeStamp: getTimeStamp(),
        });
      },
      keyUp: (e) => {
        results.keyLogger.keyDetails.push({
          key: e.key,
          code: e.code,
          timeStamp: getTimeStamp(),
        });
      },
      keyPress: (e) => {
        results.keyLogger.keyDetails.push({
          key: e.key,
          code: e.code,
          timeStamp: getTimeStamp(),
        });
      },
    },
  };
  var results = {};

  function resetResults() {
    results = {
      userEnvironment: {
        appCodeName: navigator.appCodeName || "",
        appName: navigator.appName || "",
        vendor: navigator.vendor || "",
        platform: navigator.platform || "",
        userAgent: navigator.userAgent || "",
      },
      time: {
        startTime: 0,
        currentTime: 0,
      },
      clicks: {
        clickCount: 0,
        clickDetails: [],
      },
      mouseMovements: [],
      mouseScroll: [],
      keyLogger: { keyDetails: [] },
    };
  }
  resetResults();

  function getTimeStamp() {
    return Date.now();
  }

  function config(ob) {
    user_config = {};
    Object.keys(defaults).forEach((i) => {
      i in ob ? (user_config[i] = ob[i]) : (user_config[i] = defaults[i]);
    });
  }

  function start() {
    if (Object.keys(user_config).length !== Object.keys(defaults).length) {
      console.log(
        "USER BEHAVIOUR ANALYTICS: NO CONFIG PROVIDED - SETTING TO DEFAULTS"
      );
      user_config = defaults;
    }
    // TIME SET
    if (user_config.timeCount !== undefined && user_config.timeCount) {
      results.time.startTime = getTimeStamp();
    }
    // MOUSE MOVEMENTS
    if (user_config.mouseMovement) {
      analytics.eventListeners.mouseMovement = window.addEventListener(
        "mousemove",
        analytics.eventsFunctions.mouseMovement
      );
      analytics.mouseInterval = setInterval(() => {
        if (analytics.mousePosition && analytics.mousePosition.length) {
          //if data has been captured
          if (
            !results.mouseMovements.length ||
            (analytics.mousePosition[0] !==
              results.mouseMovements[results.mouseMovements.length - 1][0] &&
              analytics.mousePosition[1] !==
                results.mouseMovements[results.mouseMovements.length - 1][1])
          ) {
            results.mouseMovements.push(analytics.mousePosition);
          }
        }
      }, defaults.mouseMovementInterval * 1000);
    }
    //CLICKS
    if (user_config.clicks) {
      analytics.eventListeners.click = window.addEventListener(
        "click",
        analytics.eventsFunctions.click
      );
    }
    //SCROLL
    if (user_config.mouseScroll) {
      analytics.eventListeners.scroll = window.addEventListener(
        "scroll",
        analytics.eventsFunctions.scroll
      );
    }
    //KEY LOGGERS
    if (user_config.keyDown) {
      analytics.eventListeners.keyDown = window.addEventListener(
        "keydown",
        analytics.eventsFunctions.keyDown
      );
    }
    if (user_config.keyUp) {
      analytics.eventListeners.keyDown = window.addEventListener(
        "keyup",
        analytics.eventsFunctions.keyUp
      );
    }
    if (user_config.keyPress) {
      analytics.eventListeners.keyPress = window.addEventListener(
        "keypress",
        analytics.eventsFunctions.keyPress
      );
    }
    //PROCESS INTERVAL
    if (user_config.processTime !== false) {
      analytics.processInterval = setInterval(() => {
        user_config.processData(result());
      }, user_config.processTime * 1000);
    }
  }

  function processResults() {
    user_config.processData(result());
    if (user_config.clearAfterProcess) {
      resetResults();
    }
  }

  function stop() {
    if (user_config.processTime !== false) {
      clearInterval(analytics.processInterval);
    }
    clearInterval(analytics.mouseInterval);
    window.removeEventListener("scroll", analytics.eventsFunctions.scroll);
    window.removeEventListener("click", analytics.eventsFunctions.click);
    window.removeEventListener(
      "mousemove",
      analytics.eventsFunctions.mouseMovement
    );
    window.removeEventListener("keydown", analytics.eventsFunctions.keyDown);
    window.removeEventListener("keyup", analytics.eventsFunctions.keyUp);
    window.removeEventListener("keypress", analytics.eventsFunctions.keyPress);
  }

  function result() {
    if (
      user_config.userEnvironment === false &&
      userBehaviourAnalytics.showResult().userEnvironment !== undefined
    ) {
      delete userBehaviourAnalytics.showResult().userEnvironment;
    }
    if (user_config.timeCount !== undefined && user_config.timeCount) {
      results.time.currentTime = getTimeStamp();
    }
    return results;
  }

  function showConfig() {
    if (Object.keys(user_config).length !== Object.keys(defaults).length) {
      return defaults;
    } else {
      return user_config;
    }
  }
  return {
    showConfig: showConfig,
    config: config,
    start: start,
    stop: stop,
    showResult: result,
    processResults: processResults,
  };
})();

export default userBehaviourAnalytics;
