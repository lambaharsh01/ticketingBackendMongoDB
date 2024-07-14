const users = require("../utils/DBschemas/users");

const jwt = require("jsonwebtoken");

exports.validateAuth = async (req, res) => {
  try {
    let { userEmail, password } = req.body;

    if (
      userEmail !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASS
    )
      throw new Error("Authentication Denied");

    let authObject = { validationSuccess: true };
    const token = jwt.sign(authObject, process.env.SEC_KEY, {
      expiresIn: "1h",
    });

    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + 1);

    return res.status(200).json({
      code: 200,
      message: "Authentication Successfull",
      token,
      validTill: currentTime.toISOString(),
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, code: 400, message: "Err: " + err });
  }
};

exports.getAllPermsisions = async (req, res) => {
  try {
    const today = new Date();
    const fourDaysFromNow = new Date(today);
    fourDaysFromNow.setDate(today.getDate() + 4);

    let premissionRequired = await users
      .find(
        {
          $or: [
            { validUntil: null },
            {
              validUntil: { $lt: fourDaysFromNow.toISOString().split("T")[0] },
            },
          ],
        },
        { userEmail: 1, userName: 1, validUntil: 1, ticketUploadInterval: 1 }
      )
      .sort({ validUntil: -1 });

    premissionRequired = premissionRequired.map((elem) => {
      if (!elem.validUntil) {
        elem.validUntil = "Not Available";
      } else {
        if (elem.validUntil.includes("-"))
          elem.validUntil = elem.validUntil.split("-").reverse().join("-");
      }
      if (!elem.ticketUploadInterval) elem.ticketUploadInterval = 30;
      return elem;
    });

    res
      .status(200)
      .json({ success: true, code: 200, data: { premissionRequired } });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, code: 400, message: "Err: " + err });
  }
};

exports.updatePermission = async (req, res) => {
  try {
    const { ticketUploadInterval, validUntil, documentId } = req.body;

    await users.findByIdAndUpdate(documentId, {
      ticketUploadInterval,
      validUntil,
    });

    res.status(200).json({
      success: true,
      code: 200,
      message: "Data Updated  successfully",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, code: 400, message: "Err: " + err });
  }
};
