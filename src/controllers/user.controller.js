import InvoiceDB from "../models/Invoice.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import csv from "csvtojson"
import hbs from "handlebars";
const file1 = "./public/testt.csv";
import puppeteer from 'puppeteer';
import fs from "fs-extra"
import path from "path"

export const storeData = asyncHandler(async (req, res) => {
    try {
        csv().fromFile(file1).then(async (data) => {
            let mainStore = data;
            let data1 = await InvoiceDB.insertMany(mainStore)
            res.status(200).json({ message: "Success", data: data1 })
        })
    } catch (error) {
        res.status(400).json({ message: "Faild", data: error })
    }
})

export const generatePdf = asyncHandler(async (req, res) => {

    try {
        const browser = await puppeteer.launch({ headless: true });

        const db = await InvoiceDB.find();

        for (let i = 0; i < db.length; i++) {
            let data = { RRN: db[i].RRN, MerchantName: db[i].MerchantName, Txndate: db[i].Txndate, RefId: db[i].RefId, Txnamount: db[i].Txnamount, MobileNumber: db[i].MobileNumber };
            const page = await browser.newPage();
            let content = await compileTemplete("index", data)
            await page.setContent(content);
            // genrate pdf
            await page.pdf({
                path: `AllGeneratedPdf/${i + 1}.pdf`,
                format: "A4",
                printBackgound: true
            })
        }
        await browser.close();
        // process.exit();

        res.status(200).json({ message: "Success", data: "Generated Successfully", db })
    } catch (error) {
        res.status(400).json({ message: "Faild", data: error })
    }
})

/*

!!!!!! generate file 

export const generatePdf = asyncHandler(async (req, res) => {
    let data = { Title: "hello this is title", Information: { amount: 500, description: "dfd", BillMobileNumber: "fdf", BillTo: "hell", GSTNumber: "helo", BillingCompanyAdd: "ddf", BillingCompanyName: "df", RefId: "ff", InvoiceDate: "rtr", RRN: "rtr", InvoiceNumber: "4354f" } };

    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        let content = await compileTemplete("index", data)
        // set the content in pdf 
        await page.setContent(content);
        await page.emulateMedia('screen');

        // create the pdf docoment
        await page.pdf({
            path: "AllGeneratedPdf/mypdf.pdf",
            format: "A4",
            printBackgound: true
        })

        console.log("done")
        await browser.close();
        // process.exit();

        res.status(200).json({ message: "Success" })
    } catch (error) {
        res.status(400).json({ message: "Faild", data: error })
    }
})

*/


// temeplete generation function
const compileTemplete = async (templeteName, data) => {
    const filePath = path.join("D:/Invoce genetator/src/controllers/templetes", `${templeteName}.hbs`);
    // get the html
    const html = await fs.readFile(filePath, "utf-8");
    return hbs.compile(html)(data)
}
