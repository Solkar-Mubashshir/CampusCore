import StudentModel from "../models/Student.model";
import TeacherModel from "../models/Student.model";
import HRTeacherModel from "../models/Student.model";
import HODModel from "../models/Student.model";

// ---------------------------------------------------------------------------------------------------------------------
// global variables
 const otp_data = {};
 const OTP_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes
// 

// ----------------------------------------------------------------------------------------------------------------------
// otp generator
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};
// ----------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------
// otp sender
export const SendOTP = async (req, res) => {
  try {
    const { number } = req.body;
    const pattern = /^[0-9]{10}$/; // pattern
    let Student_num = await StudentModel.findOne({ number });
    let teacher = await TeacherModel.findOne({ number });
    let HRteacher = await HRTeacherModel.findOne({ number });
    let HOD = await HODModel.findOne({ number });

    if (!pattern.test(number))
      return res.status(400).json({ message: "Invalid number passed" });

    if ((!Student_num) || ( !teacher || !HRteacher || !HOD)) {
      return res.status(409).json({ message: "Check The number and try again"});
    }

    if ((Student_num) || (teacher ||  HRteacher || HOD)) {
      const otp = generateOTP();
      // ✅ STORE OTP WITH EXPIRY
      otp_data[number] = {
        otp,
        expiresAt: Date.now() + OTP_EXPIRY_TIME,
      };

      const whatsapp_url = `https://graph.facebook.com/v20.0/${process.env.MOBILE_ID}/messages`;

      await axios.post(
        whatsapp_url,
        {
          messaging_product: "whatsapp",
          to: `91${number}`,
          type: "template",
          template: {
            name: "delivery",
            language: { code: "en" },
            components: [
              {
                type: "body",
                parameters: [{ type: "text", text: otp }],
              },
              {
                type: "button",
                sub_type: "url", // url button (Meta calls it URL)
                index: 0, // index 0 -> first button
                parameters: [
                  { type: "text", text: "otp" },
                  // <- fill with the actual URL your template expects
                ],
              },
            ],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.TOKENS}`,
            "Content-Type": "application/json",
          },
        },
      );

      res.json({ success: true });
    }
  } catch (error) {
    console.error("Error sending OTP:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};
// ----------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------
// otp verification
export const verifyOTP = async (req, res) => {
  const { number, otp } = req.body;

  if (!number || !otp) {
    return res.status(400).json({ message: "Number and OTP required" });
  }

  const record = otp_data[number];

  // ❌ No OTP found
  if (!record) {
    return res.status(400).json({ message: "OTP expired or not found" });
  }

  // ❌ OTP expired
  if (record.expiresAt < Date.now()) {
    delete otp_data[number];
    return res.status(400).json({ message: "OTP expired" });
  }

  // ❌ OTP mismatch
  if (record.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  let user = await StudentModel.findOne({ number });

  if (!user) {
  let HOD = await HODModel.findOne({ number });
}
  if (!user) {
  let HRteacher = await HRTeacherModel.findOne({ number });
}
  if (!user) {
  let user = await TeacherModel.findOne({ number });
}


  // ✅ OTP verified
  delete otp_data[number]; // one-time use
    const accessToken = signAccessToken({
      _id: user._id,
      role: user.role,
    });

    return res
      .cookie("AccessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        redirect: user.role
      });
};


----------------------------------------------------------------------------------------------------------------------

export const Logouthandaler = async (req, res) => {
  try {
    const AccessToken = req.cookies.AccessToken;
    if (!AccessToken) {
      return res.status(500).json({ message: "accesstoken not found" });
    }
    res
      .clearCookie("AccessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .json({ message: "Logged out successfully" });
  } catch (e) {
    return res.json({ message: `${e}` });
  }
};
// ----------------------------------------------------------------------------------------------------------------------
