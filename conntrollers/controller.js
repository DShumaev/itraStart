class Controller {
  sendHelloMessage(req, res) {
    res.json({
      message: "Hello my dear friend!",
    });
  }
}

module.exports = new Controller();
