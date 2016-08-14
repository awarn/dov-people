
"use strict";

require('dotenv').config();

const bluebird = require("bluebird")
const fs = require("fs")
const webdriver = require('selenium-webdriver')
const firefox = require('selenium-webdriver/firefox')
const Capabilities = require('selenium-webdriver/lib/capabilities').Capabilities;
	const By = webdriver.By;
	const until = webdriver.until;
const FirefoxProfile = require("firefox-profile")

let wait = (timeout) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(true), timeout)
	})
}

let capabilities = Capabilities.firefox();
capabilities.set('firefox_binary', "/Applications/Firefox.app/Contents/MacOS/firefox");
//capabilities.set('marionette', true);

let profile = new firefox.Profile(
	process.env.FIREFOX_PROFILE_PATH);
let options = new firefox.Options().setProfile(profile);
//let driver = new firefox.Driver(options);
let driver = new webdriver.Builder()
	.forBrowser('firefox')
	.setFirefoxOptions(options)
	.build();

driver.manage().window().setPosition(0,0);
driver.manage().window().setSize(1024,768);

driver.get(process.env.TEST_URL);

driver.wait(until.titleIs('People Counter Setup Tool'), 5000);

driver.wait(function() {
	return driver.findElement(By.id("silverlightControlHost"))
}, 5000)

wait(5000).then(() => {
	driver.actions()
		.moveToElement(driver.findElement(By.id("silverlightControlHost")), 0, 0)
		.mouseMove({x: 975, y: 25})
		.click()
		.build()
		.perform()
	driver.quit()
})

