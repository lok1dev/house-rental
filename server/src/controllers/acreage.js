import * as services from "../services/acreage";

export const getAcreage = async (req, res) => {
    try {
        const response = await services.getAcreageService();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: "Fail at acreage controller " + error,
        });
    }
};
