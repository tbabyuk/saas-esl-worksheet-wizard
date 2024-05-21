import { NextResponse } from "next/server";
import { matchingTemplate } from "../../../public/templates/matching";



// POST route will fetch our dynamic data
export async function POST(req) {

    const data = await req.json()
    
    console.log("logging data from create-pdf API:", data);


    const htmlContent = "<html><body><h1>TESTING</h1></body></html>"

    const outputFile = "/output.pdf"


    await makePDF(htmlContent, outputFile);


    return NextResponse.json({message: "success!"})

}

// GET route will send the generated PDF to the client
export async function GET(req) {

    const data = await req.json()
    
    console.log("logging data from create-pdf API:", data);


    return NextResponse.json({message: "success!"})

}

// D:\Coding Files\0. IN PROGRESS\esl-worksheet-wizard-sass\public\templates\template.html

// pasted from blog

async function makePDF(html, output) {
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // await page.setContent("<html><body><h1>TESTING</h1></body></html>", {waitUntil: "domcontentloaded"});

    // const pdfBuffer = await page.pdf({
    //     format: "A4",
    //     path: "/output/testing.pdf",
    //     printBackground: true
    // })

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, {waitUntil: "domcontentloaded"});

    await page.pdf({path: output, format: "A4"});

    await browser.close();
}



