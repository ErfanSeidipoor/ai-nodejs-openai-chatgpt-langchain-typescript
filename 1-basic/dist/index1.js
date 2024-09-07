"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default({
    apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const thread = yield openai.beta.threads.create({});
        const message = yield openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: `{url": "https://calendar.google.com/calendar/u/0/r", "text": "Stocks 101 - Investing Ethically in the Stock Market In this short article, we will cover investing in stocks and briefly explain ways and vehicles to invest with an ethical focus. Stocks play a key part in a diversified portfolio of assets. Stocks 101 - Investing Ethically in the Stock Market You've started the saving process and now you're left with some spare money at the end of the month or you want to begin to allocate some of your cash savings into investments which protect you from devaluation / inflation. In this short article, we will cover investing in stocks and give a brief explanation on ways and vehicles to invest. Stocks play a key part within a diversified portfolio of assets. In prior articles we have explained the correlation and causation of increases in money supply to asset prices. This has caused the US stock market to grow at a rate of 11.1% per year over the last 20 years in the US stock market. Read the articles Why the money in your bank account doesn’t really exist... and The WORLD is built on debt... what's going on? to understand how the policy of money printing drives up asset prices. With Compound growth - The 8th wonder of the world and the rule of 72 we would have seen our investment double every 6.5 years at a return rate of 11.1% per year. It is therefore not necessarily the amount of money invested but the time in the market which can contribute to significant gains and protection from inflation. Below is a chart showing the returns of FTSE all world over the last 20 years - FTSE All-World Index: The index measures the market performance of large- and mid-capitalisation stocks of companies located around the world. Includes approximately 3,900 holdings in nearly 50 countries, including both developed and emerging markets. Covers more than 95% of the global investable market capitalisation. £10,000 invested into this index in 2004 is now worth approximately £70,000 today! So what are stocks A stock represents a share in the ownership of a company, including a claim on the company's earnings and assets. As such, stockholders are partial owners of the company. Fractional shares of stock also represent ownership of a company, but at a size smaller than a full share of common stock. The majority of the largest companies in the world are "public" companies which means that anyone is able to buy shares in the company on a stock exchange. Think of the biggest brands on the planet, the companies you deal with daily such as Google, Apple, Amazon, Tesco, Vodafone, the Royal Mail - these are all publicly listed companies that you can have partial ownership of . Private companies are held by individuals and not available for purchase - for example Elon Musk recently bought Twitter which was a public company and he then converted it into a privately held company. Private companies hold the advantage that they are not duty bound to the demands of the shareholders. Stock picking is notoriously hard so much so that Princeton University professor Burton Malkiel famously claimed in his bestselling book, A Random Walk Down Wall Street, that “a blindfolded monkey throwing darts at a newspaper’s financial pages could select a portfolio that would do just as well as one carefully selected by experts”. Experts therefore recommend investors to buy a proportion of all the stocks in a set region - an index fund. We understand that the value of stocks in aggregate rise due to increases in money supply - we do not wish to make a judgement here on any individual company. For example the FTSE 100 is the index which tracks the performance of the 100 largest publicly listed companies in the UK. In the US the benchmark index that is often referred to is the S&P500 which is an index of the largest 500 companies in America. We can see in the chart above of the FTSE All World Index that an investor who had exposure to all of the largest companies over the last 20 years performed extremely well without having to be a professional stock picker 😀 When we wrote about Compound growth - The 8th wonder of the world we realised that it is time in the market that matters most in building wealth via asset growth. Warren Buffet explained this in his famous quote: “The stock market is a device for transferring money from the impatient to the patient.” Pensions: Stocks held for the long term and your retirement should be held in Pensions as they are the most tax efficient way to hold stocks as we explained in A Guide To Pensions. Remember you have control over how your pension money is invested - it is critical to know where our funds are going and that we are maximising the employee and tax benefits to investing via Pensions. Pensions hold stocks via tracker funds covering equities and bonds.. The typical pension allocation will hold 60-80% of assets in a variety of stock market funds and the balance in a bond portfolio. The 60/40 portfolio is typically defined in traditional finance as a balanced portfolio. Bonds are a type of investment that allows individuals to lend money to governments or corporations in exchange for interest payments and the return of their initial investment. Bonds are also known as fixed-income or fixed-interest investments. Owners of bonds are therefore the lender and receiver of interest. As Muslims we should be conscious of the allocation of our investing - by taking action deciding which equity funds our pension is invested in we can ensure that we aren't buying Haram stocks. Shariah compliant stock performance is comparable to indexes which include companies that profit from Haram activities and goods. With respect to Bonds, we pose the question here - who are we lending money to via our bond investments and what is the money being used for? Are we happy for our money to be allocated here? We estimate that in the UK Muslims hold approximately £150bn of assets in pension funds. We can make a significant impact by adjusting our allocation to more ethical, God conscious investments. Once we have chosen more halal ethical options pensions are the best way to let compound growth work for you over long time periods which we explained is the best way to build long term wealth. Exchange Traded Funds (ETFs) An exchange-traded fund (ETF) is a type of investment fund that allows investors to buy and sell a bundle of assets on a stock exchange during market hours. ETFs are often made up of shares bonds or commodities, and are usually run at LOW COSTS which aim to replicate the returns of an Index or asset. For example you are able to buy the FTSE All World Index we discussed earlier as an ETF with a management fee of just 0.2%! This is the cheapest way to get exposure to global stock markets and assets. There are ETFs created covering global equity markets, commodities such as gold, silver and oil as well as bond market ETFs which enable investors to lend money to companies and governments. This means that investors in ETFs can build diversified portfolios across global equity markets, sectors and asset classes. ISAs In the UK there is an allowance of £20k per person per year to invest in stocks and shares or Cash ISAs with no capital gains tax to be paid on profits. Cash ISAs offer fixed rate returns (interest) on savings - these rates are historically lower than inflation but offer at least some protection for 1-2 year savings of cash. Early withdrawal will forfeit your earnings. As a Muslim are we happy to earn money from interest, or should we be looking for alternatives? Interest paid from these accounts is generated by further lending which we discussed when talking of Fractional reserve banking in Why the money in your bank account doesn’t really exist... Stocks and Shares ISAs allow however allow you to invest in stocks and commodities ETFs. Stocks and Shares ISAs should be used for medium term investments usually aiming for 1-10 years so that true compounding and time in the market can be achieved. These investments are however extremely liquid (Mon-Fri) and can be sold within a few days to cover any emergencies that may arise. Compare this to how long it would take to sell an investment in a property helps to frame whether our investments match our plans and goals for the medium term. Stocks and Share ISA providers: There are many providers of Stocks and Shares ISAs - we defer here to money saving expert for their guide to the various ISA providers. https://www.moneysavingexpert.com/savings/stocks-shares-isas/ Shariah Compliant ETFs: The below table shows a range of commodity and Shariah compliant ETFs covering various categories and regions. Shariah compliant ETFs are index funds which track for example the US stock market but have removed the companies which are deemed to make money from Haram activities. This would include gambling , alcohol, financial companies which make money from interest and companies which have high levels of debt. You can read more about how stocks are determined as "shariah compliant" here: 3 things to check if a Stock is Halal Muslim money app We acknowledge that these funds are not 100% perfect at classifying unethical companies - however they are a great starting point for Muslims looking to invest in the stock market in a more halal way. Performance of Commodity and Shariah compliant ETFs: We can see in the table below just how well the following funds have done over the last 10 years. Shariah compliant stocks and commodity funds have been successful at protecting investors from inflation and have delivered significant capital gains. Zoya finance have written a great article on the various shariah compliant ETFs available in the UK and what they cover with fees : Best Halal ETFs to Buy in 2024 Discover the best halal ETFs to buy in 2024. Learn how to evaluate Shariah-compliant ETFs, assess their performance, and explore top picks for Muslim investors. Zoya Blog Vivian Tejada Remember past performance is not indicative of future returns and that the value of your investment may go down. Dollar cost averaging(DCA) Dollar cost averaging (DCA) is an investment strategy that involves regularly investing a set amount of money into an investment, regardless of the market price. This technique helps to reduce the effects of short-term market fluctuations by averaging out the costs of units over time. DCA can help investors buy more shares when prices are low and fewer shares when prices are high, which can lower the average cost per share and reduce the overall impact of price volatility. It can also help to prevent investors from making poorly timed lump sum investments at potentially higher prices. Conclusion: Stocks are higher risk assets - that means in the short term the value of your investments can fall. However it is important to remember why you are buying stocks and assets. Typically assets can help to protect investors from inflation. Money which is left "saved" in your bank account with low rates of interest is also losing value constantly as we explained in The Truth About Inflation. Stocks play a pivotal role in diversified portfolios, historically they have been consistently the best performing asset class and play a hybrid role of being a liquid asset that perform well in the medium to long term. With pensions we are able to build wealth for our retirements with compounding helping to grow our wealth and with ISAs we can have a liquid portfolio that we build over time with no capital gains tax payable. Investors should take care to choose appropriate assets after conducting their careful due diligence - each circumstance is different with varying risk profiles and goals. Please seek advice from a financial adviser if you are unsure. Investing money requires education and learning, these articles aim to provide a quick and broad overview of complex topics. We hope they awaken readers to begin to take steps to manage their finances and begin to truly understand money. Nothing in this article should be considered as financial advice", "tone": "Fantasy", "is_with_emoji": "true", "is_with_hashtags": "false", "style": "short_summary"}`,
        });
        const run = openai.beta.threads.runs
            .stream(thread.id, {
            assistant_id: "asst_BKxPSxw25VcTVAAN0LbF3AJz",
        })
            .on("textCreated", (text) => {
            console.log("textCreated", { text });
            process.stdout.write("\nassistant > ");
        });
    });
}
main();