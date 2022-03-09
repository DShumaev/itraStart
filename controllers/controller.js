class Controller {
  static sendHelloMessage(req, res) {
    res.json({
      message: "Hello my dear friend!",
    });
  }
}

module.exports = Controller;
