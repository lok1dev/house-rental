import db from "../models";
import { Op, where } from "sequelize";
import { v4 } from "uuid";
import generateCode from "../utils/generateCode";
import moment from "moment";
import generateDate from "../utils/generateDate";

export const getPostsService = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.Post.findAll({
                raw: true,
                nest: true,
                include: [
                    { model: db.Image, as: "images", attributes: ["image"] },
                    {
                        model: db.Attribute,
                        as: "attributes",
                        attributes: ["price", "acreage", "published", "hashtag"],
                    },
                    { model: db.User, as: "user", attributes: ["name", "zalo", "phone"] },
                ],
                attributes: ["id", "title", "star", "address", "description"],
            });
            resolve({
                err: response ? 0 : 1,
                msg: response ? "OK" : "Get posts is failed",
                response,
            });
        } catch (error) {
            reject(error);
        }
    });

export const getPostsLimitService = (
    page,
    { limitPost, order, ...query },
    { priceNumber, acreageNumber }
) =>
    new Promise(async (resolve, reject) => {
        try {
            let offset = !page || +page <= 1 ? 0 : +page - 1;
            const queries = { ...query };
            const limit = +limitPost || +process.env.LIMIT;
            queries.limit = limit;
            if (priceNumber) query.priceNumber = { [Op.between]: priceNumber };
            if (acreageNumber) query.acreageNumber = { [Op.between]: acreageNumber };
            if (order) queries.order = [order];
            const response = await db.Post.findAndCountAll({
                where: query,
                raw: true,
                nest: true,
                offset: offset * limit,
                ...queries,
                include: [
                    { model: db.Image, as: "images", attributes: ["image"] },
                    {
                        model: db.Attribute,
                        as: "attributes",
                        attributes: ["price", "acreage", "published", "hashtag"],
                    },
                    {
                        model: db.User,
                        as: "user",
                        attributes: ["name", "zalo", "phone", "avatar"],
                    },
                    { model: db.Overview, as: "overviews" },
                ],
                attributes: ["id", "title", "star", "address", "description"],
            });
            resolve({
                err: response ? 0 : 1,
                msg: response ? "OK" : "Get posts is failed",
                response,
            });
        } catch (error) {
            reject(error);
        }
    });

export const getNewPostsService = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.Post.findAll({
                raw: true,
                nest: true,
                offset: 0,
                order: [["createdAt", "DESC"]],
                limit: +process.env.LIMIT,
                include: [
                    { model: db.Image, as: "images", attributes: ["image"] },
                    {
                        model: db.Attribute,
                        as: "attributes",
                        attributes: ["price", "acreage", "published", "hashtag"],
                    },
                ],
                attributes: ["id", "title", "star", "createdAt"],
            });
            resolve({
                err: response ? 0 : 1,
                msg: response ? "OK" : "Get posts is failed",
                response,
            });
        } catch (error) {
            reject(error);
        }
    });

export const createNewPostService = (body, userId) =>
    new Promise(async (resolve, reject) => {
        try {
            const postId = v4();
            const attributesId = v4();
            const overviewId = v4();
            const imagesId = v4();
            const hashtag = `#${Math.floor(Math.random() * Math.pow(10, 6))}`;
            const currentDate = generateDate();
            const labelCode = generateCode(body.label);
            const provinceCode = body?.province?.includes("Thành phố")
                ? generateCode(body?.province?.replace("Thành phố ", ""))
                : generateCode(body?.province?.replace("Tỉnh ", ""));

            const provinceValue = body?.province?.includes("Thành phố")
                ? body?.province?.replace("Thành phố ", "")
                : body?.province?.replace("Tỉnh ", "");

            await db.Post.create({
                id: postId,
                title: body.title,
                labelCode,
                address: body.address || null,
                attributesId,
                categoryCode: body.categoryCode,
                description: JSON.stringify(body.description) || null,
                userId,
                overviewId,
                imagesId,
                acreageCode: body.acreageCode || null,
                priceCode: body.priceCode || null,
                provinceCode: provinceCode || null,
                priceNumber: body.priceNumber,
                acreageNumber: body.acreageNumber,
            });

            await db.Attribute.create({
                id: attributesId,
                price:
                    +body.priceNumber < 1
                        ? `${+body.priceNumber * 1000000} đồng/tháng`
                        : `${+body.priceNumber} triệu/tháng`,
                acreage: `${+body.acreageNumber}m2`,
                published: moment(new Date()).format("DD/MM/YYYY"),
                hashtag,
            });

            await db.Image.create({
                id: imagesId,
                image: JSON.stringify(body.images),
            });

            await db.Overview.create({
                id: overviewId,
                code: hashtag,
                area: body.label,
                type: body?.category,
                target: body?.target,
                bonus: "Tin thường",
                created: currentDate.today,
                expired: currentDate.expireDay,
            });

            await db.Label.findOrCreate({
                where: { code: labelCode },
                defaults: {
                    code: labelCode,
                    value: body.label,
                },
            });

            await db.Province.findOrCreate({
                where: {
                    [Op.or]: [
                        { value: body?.province?.replace("Thành phố ", "") },
                        { value: body?.province?.replace("Tỉnh ", "") },
                    ],
                },
                defaults: {
                    code: provinceCode,
                    value: provinceValue,
                },
            });

            resolve({
                err: 0,
                msg: "OK",
            });
        } catch (error) {
            reject(error);
        }
    });

export const getPostManagerService = (page, id, query) =>
    new Promise(async (resolve, reject) => {
        try {
            let offset = !page || +page <= 1 ? 0 : +page - 1;
            const queries = { ...query, userId: id };
            const response = await db.Post.findAndCountAll({
                where: queries,
                raw: true,
                nest: true,
                offset: offset * +process.env.LIMIT,
                order: [["createdAt", "DESC"]],
                limit: +process.env.LIMIT,
                include: [
                    { model: db.Image, as: "images", attributes: ["image"] },
                    {
                        model: db.Attribute,
                        as: "attributes",
                        attributes: ["price", "acreage", "published", "hashtag"],
                    },
                    { model: db.User, as: "user", attributes: ["name", "zalo", "phone"] },
                    { model: db.Overview, as: "overviews" },
                ],
                // attributes: ["id", "title", "star", "address", "description"],
            });
            resolve({
                err: response ? 0 : 1,
                msg: response ? "OK" : "Get posts is failed",
                response,
            });
        } catch (error) {
            reject(error);
        }
    });

export const updatePost = ({ postId, attributesId, imagesId, overviewId, ...body }) =>
    new Promise(async (resolve, reject) => {
        const labelCode = generateCode(body.label);
        const provinceCode = body?.province?.includes("Thành phố")
            ? generateCode(body?.province?.replace("Thành phố ", ""))
            : generateCode(body?.province?.replace("Tỉnh ", ""));

        const provinceValue = body?.province?.includes("Thành phố")
            ? body?.province?.replace("Thành phố ", "")
            : body?.province?.replace("Tỉnh ", "");
        try {
            await db.Post.update(
                {
                    title: body.title,
                    labelCode,
                    address: body.address || null,
                    categoryCode: body.categoryCode,
                    description: JSON.stringify(body.description) || null,
                    acreageCode: body.acreageCode || null,
                    priceCode: body.priceCode || null,
                    provinceCode: provinceCode || null,
                    priceNumber: body.priceNumber,
                    acreageNumber: body.acreageNumber,
                },
                {
                    where: { id: postId },
                }
            );

            await db.Attribute.update(
                {
                    price:
                        +body.priceNumber < 1
                            ? `${+body.priceNumber * 1000000} đồng/tháng`
                            : `${+body.priceNumber} triệu/tháng`,
                    acreage: `${+body.acreageNumber}m2`,
                },
                {
                    where: { id: attributesId },
                }
            );

            await db.Image.update(
                {
                    image: JSON.stringify(body.images),
                },
                { where: { id: imagesId } }
            );

            await db.Overview.update(
                {
                    area: body.label,
                    type: body?.category,
                    target: body?.target,
                },
                { where: { id: overviewId } }
            );

            await db.Label.findOrCreate({
                where: { code: labelCode },
                defaults: {
                    code: labelCode,
                    value: body.label,
                },
            });

            await db.Province.findOrCreate({
                where: {
                    [Op.or]: [
                        { value: body?.province?.replace("Thành phố ", "") },
                        { value: body?.province?.replace("Tỉnh ", "") },
                    ],
                },
                defaults: {
                    code: provinceCode,
                    value: provinceValue,
                },
            });

            resolve({
                err: 0,
                msg: "Updated",
            });
        } catch (error) {
            reject(error);
        }
    });

export const deletePost = (postId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.Post.destroy({
                where: { id: postId },
            });
            resolve({
                err: response > 0 ? 0 : 1,
                msg: response > 0 ? "Deleted" : "Delete Failed",
            });
        } catch (error) {
            reject(error);
        }
    });
