var dialogflow = require("dialogflow");


module.exports = authentication = async function(msgToSend) {
  const projectId = "esprit-42f65";
  const sessionId = "session";
  const languageCode = "fr";
  const authenticationFile = "./EspritBot.json"

  const sessionClient = new dialogflow.SessionsClient({
    projectId,
    keyFilename: authenticationFile
  });
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: msgToSend,
        languageCode: languageCode
      }
    }
  };

  try {
    let response = await sessionClient.detectIntent(request);
    return response;
  } catch (err) {
    return err;
  }
};
