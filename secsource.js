function determineSecondChannel(primaryChannel, fallbackData) {
  console.log("Debugging determineSecondChannel...");
  console.log(`Primary Channel: ${primaryChannel}`);
  console.log(`Fallback Data: ${fallbackData}`);
  
  if (!fallbackData) {
    console.log("No fallback data found. Returning: No Second Source");
    return { primary: primaryChannel, secondary: "No Second Source" };
  }

  function excludePrimaryValues(values, primaryValues) {
    if (!values) return "";
    const valueArray = Array.isArray(values) ? values : values.split(",");
    return valueArray
      .filter((value) => !primaryValues.includes(value.toLowerCase().trim()))
      .join(",");
  }

  const params = fallbackData.split("&");
  const parsedParams = {};

  params.forEach((param) => {
    const parts = param.split("=");
    if (parts.length === 2) {
      const key = parts[0].toLowerCase().trim();
      const value = parts[1].toLowerCase().trim();
      if (parsedParams[key]) {
        parsedParams[key] = Array.isArray(parsedParams[key])
          ? [...parsedParams[key], value]
          : [parsedParams[key], value];
      } else {
        parsedParams[key] = value;
      }
    }
  });

  console.log("Parsed Parameters:", parsedParams);

  let secondaryChannel = null;

  function checkAndAssignChannel(channelName, condition) {
    if (condition) {
      console.log(`Condition for ${channelName}:`, condition);
    }
    if (!secondaryChannel && condition && primaryChannel.toLowerCase() !== channelName.toLowerCase()) {
      secondaryChannel = channelName;
      console.log(`Assigned Secondary Channel: ${secondaryChannel}`);
    }
  }

  const utmSource = Array.isArray(parsedParams["utm_source"])
    ? parsedParams["utm_source"].join(",")
    : parsedParams["utm_source"];
  const utmMedium = Array.isArray(parsedParams["utm_medium"])
    ? parsedParams["utm_medium"].join(",")
    : parsedParams["utm_medium"];

  console.log("utm_source:", utmSource);
  console.log("utm_medium:", utmMedium);

  const primaryValues = [
    primaryChannel.toLowerCase(),
    "cpc",
    "google",
    "tiktok",
    "newsletter",
    "email",
    "facebook", // Исключаем для Source
  ];

  if (utmSource) {
    const sources = utmSource.split(",");
    if (sources.includes("google") && utmMedium && utmMedium.includes("cpc")) {
      checkAndAssignChannel("Google Ads", true);
    }
  }

  checkAndAssignChannel(
    "Email Traffic",
    parsedParams["ml_recipient"] || 
    (utmSource && (utmSource.includes("newsletter") || utmSource.includes("email")))
  );

  checkAndAssignChannel(
    "TikTok Ads",
    utmSource && utmSource.includes("tiktok")
  );

  checkAndAssignChannel(
    "Facebook Ads",
    utmSource && utmSource.includes("facebook") || parsedParams["fbclid"]
  );

  checkAndAssignChannel("Organic", utmSource && utmSource.includes("organic"));
  checkAndAssignChannel("Direct", utmSource && utmSource.includes("direct"));
  checkAndAssignChannel("GMB", utmSource && utmSource.includes("gmb"));

  if (
    utmSource === "registration_page" &&
    primaryChannel.toLowerCase() === "re registered after success"
  ) {
    checkAndAssignChannel("No Second Source", true);
  }

  checkAndAssignChannel(
    "Free Eye Test Button",
    parsedParams["nerete"] && parsedParams["nerete"].toLowerCase().trim() === "1" && !utmSource
  );

  if (!secondaryChannel) {
    const filteredSource = excludePrimaryValues(utmSource, primaryValues);
    if (filteredSource) {
      checkAndAssignChannel(`Source:${filteredSource}`, true);
    }
  }

  if (!secondaryChannel) {
    console.log("No conditions met. Setting to: No Second Source");
    secondaryChannel = "No Second Source";
  }

  console.log("Final Secondary Channel:", secondaryChannel);
  return { primary: primaryChannel, secondary: secondaryChannel };
}
