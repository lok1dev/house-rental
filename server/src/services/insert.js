import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import dotenv from "dotenv";

import db from "../models";
import chothuecanho from "../../data/chothuecanho.json";
import generateCode from "../utils/generateCode";
import { dataAcreage, dataPrice } from "../utils/data";
import getNumberFromString from "../utils/getNumberFromString";

dotenv.config();

const dataBody = chothuecanho.body;

const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const insertService = () =>
    new Promise(async (resolve, reject) => {
        try {
            for (const item of dataBody) {
                let postId = v4();
                let labelCode = generateCode(item?.header?.class?.classType);
                let attributesId = v4();
                let userId = v4();
                let overviewId = v4();
                let imagesId = v4();
                let currentAcreage = getNumberFromString(item?.header?.attributes?.acreage);
                let currentPrice = getNumberFromString(item?.header?.attributes?.price);

                await db.Post.create({
                    id: postId,
                    title: item?.header?.title,
                    star: item?.header?.star,
                    labelCode,
                    address: item?.header?.address,
                    attributesId,
                    categoryCode: `NCT`,
                    description: JSON.stringify(item?.mainContent?.content ?? ""),
                    userId,
                    overviewId,
                    imagesId,
                    acreageCode: dataAcreage.find(
                        (acreage) => acreage.max > currentAcreage && acreage.min <= currentAcreage
                    )?.code,
                    priceCode: dataPrice.find(
                        (price) => price.max > currentPrice && price.min <= currentPrice
                    )?.code,
                });

                await db.Attribute.create({
                    id: attributesId,
                    price: item?.header?.attributes?.price,
                    acreage: item?.header?.attributes?.acreage,
                    published: item?.header?.attributes?.published,
                    hashtag: item?.header?.attributes?.hashtag,
                });

                await db.Image.create({
                    id: imagesId,
                    image: JSON.stringify(item?.images),
                });

                await db.Label.findOrCreate({
                    where: { code: labelCode },
                    defaults: {
                        code: labelCode,
                        value: item?.header?.class?.classType,
                    },
                });

                await db.Overview.create({
                    id: overviewId,
                    code: item?.overview?.content?.find((i) => i.name == "Mã tin:")?.content,
                    area: item?.overview?.content?.find((i) => i.name == "Khu vực")?.content,
                    type: item?.overview?.content?.find((i) => i.name == "Loại tin rao:")?.content,
                    target: item?.overview?.content?.find((i) => i.name === "Đối tượng thuê:")
                        ?.content,
                    bonus: item?.overview?.content?.find((i) => i.name == "Gói tin:")?.content,
                    created: item?.overview?.content?.find((i) => i.name == "Ngày đăng:" ?? "")
                        ?.content,
                    expired: item?.overview?.content?.find((i) => i.name === "Ngày hết hạn:")
                        ?.content,
                });

                await db.User.create({
                    id: userId,
                    name: item?.contact?.content.find((i) => i.name == "Liên hệ:")?.content,
                    password: hashPassword("123456"),
                    phone: item?.contact?.content.find((i) => i.name == "Điện thoại:")?.content,
                    zalo: item?.contact?.content.find((i) => i.name == "Zalo")?.content,
                });
            }
            resolve("DONE");
        } catch (error) {
            reject(error);
        }
    });

export const createPricesAndAcreage = () =>
    new Promise((resolve, reject) => {
        try {
            dataAcreage.forEach(async (item) => {
                await db.Acreage.create({
                    id: v4(),
                    code: item.code,
                    value: item.value,
                });
            });

            dataPrice.forEach(async (item) => {
                await db.Price.create({
                    id: v4(),
                    code: item.code,
                    value: item.value,
                });
            });

            resolve("OK");
        } catch (error) {
            reject(error);
        }
    });
