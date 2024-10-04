import account_pages from "../../support/pages/account_pages";

describe('Account Overview', () => {
    it('Should validate the total balance', () => {
        account_pages.launchUrl()
        account_pages.loginData({username: 'admin', password: 'admin'})
        account_pages.verifyTotalBalance()
    });
});