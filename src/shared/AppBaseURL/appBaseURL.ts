export let newBaseUrl = "Dev";

const baseUrlMap = {
  Dev: "http://142.4.222.78:449/",
  Live: "http://142.4.222.78:444/",
  Testing: "http://142.4.222.78:256/",
  VelocityOne: "http://142.4.222.78:446/",
};

newBaseUrl = baseUrlMap[newBaseUrl] || newBaseUrl;
