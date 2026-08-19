const pool = require("../database/connection");

const {
  createProfile,
  getProfileByUserID
} = require("../services/profileService");

const createProfileController = async (req, res) => {
  try {
    // Trust the verified token over anything the client sent in the body.
    const user_id = req.user.id;
    const {
      profile_type,
      profile_picture,
      id_number,
      department,
      institution,
      cgpa,
      semester,
      graduation_year,
      address,
      bio
    } = req.body;

    // Check whether user_id is provided
    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required."
      });
    }

    // Check whether the user already has a profile
    const profileExists = await getProfileByUserID(user_id);

    if (profileExists.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists."
      });
    }

    // Create Profile
    await createProfile(
      user_id,
      profile_type,
      profile_picture,
      id_number,
      department,
      institution,
      cgpa,
      semester,
      graduation_year,
      address,
      bio
    );

    // Mark the user's account as having a completed profile
    await pool.promise().query(
      "UPDATE users SET profile_completed = 1 WHERE id = ?",
      [user_id]
    );

    return res.status(201).json({
      success: true,
      message: "Profile created successfully."
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
      error: error.message
    });
  }
};

const getProfileController = async (req, res) => {
  try {
    // A user may only ever look up their own profile.
    const user_id = req.user.id;

    const [profile] = await pool.promise().query(
      "SELECT * FROM profiles WHERE user_id = ?",
      [user_id]
    );

    if (profile.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Profile not found."
      });
    }

    return res.status(200).json({
      success: true,
      profile: profile[0]
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    // A user may only ever update their own profile.
    const user_id = req.user.id;

    const {
      profile_type,
      profile_picture,
      id_number,
      bio,
      department,
      institution,
      cgpa,
      semester,
      graduation_year,
      address
    } = req.body;

    await pool.promise().query(
      `UPDATE profiles
       SET
        profile_type = ?,
        profile_picture = ?,
        id_number = ?,
        bio = ?,
        department = ?,
        institution = ?,
        cgpa = ?,
        semester = ?,
        graduation_year = ?,
        address = ?
       WHERE user_id = ?`,
      [
        profile_type,
        profile_picture,
        id_number,
        bio,
        department,
        institution,
        cgpa,
        semester,
        graduation_year,
        address,
        user_id
      ]
    );

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully."
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createProfileController,
  getProfileController,
  updateProfileController
};
