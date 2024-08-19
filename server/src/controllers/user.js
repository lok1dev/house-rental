import * as services from "../services/user";

export const getCurrentUser = async (req, res) => {
   const { id } = req.user;
   try {
      const response = await services.getOneUser(id);
      return res.status(200).json(response);
   } catch (error) {
      return res.status(500).json({
         err: -1,
         msg: "Fail at user controller " + error,
      });
   }
};

export const updateUser = async (req, res) => {
   const { id } = req.user;
   const payload = req.body;
   try {
      const response = await services.updateProfile(payload, id);
      if (!payload)
         return res.status(400).json({
            err: 1,
            msg: "Thiếu payload",
         });
      return res.status(200).json(response);
   } catch (error) {
      return res.status(500).json({
         err: -1,
         msg: "Fail at update user controller " + error,
      });
   }
};
