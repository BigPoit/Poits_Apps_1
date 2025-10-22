#include <arduino.h>
#line 1 "C:\\Users\\pnsch\\OneDrive\\Documenten\\Arduino\\weather_oo\\weather_oo.ino"
#line 1 "C:\\Users\\pnsch\\OneDrive\\Documenten\\Arduino\\weather_oo\\weather_oo.ino"
#include <lvgl.h>
#include "msgbox_manager.h"
#include "language_loader.h"
#include "settings_screen.h"
#include "flip_clock.h"
#include "explorer_screen.h"
#include "location_screen.h"
#include "weather_screen.h"
#include "wifi_info.h"
#include "wifi_cfg.h"
#include "wifi_ui_helpers.h"
#include "wifi_manager.h"
#include "weather_service.h"
#include "nvs_manager.h"
#include "time_manager.h"
#include "hardware.h"
#include "screen_base.h"
#include "screen_manager.h"
#include "style_manager.h"
#include "main_screen.h"
#include "status_bar.h"
#include "app_constants.h"
#include "logging.h"
#include "globals.h"
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <Preferences.h>
#include <LittleFS.h>
#include <esp_display_panel.hpp>
#include <time.h>
#include "esp_sntp.h"
#include <ArduinoJson.h>

String lasterror = "";


#line 36 "C:\\Users\\pnsch\\OneDrive\\Documenten\\Arduino\\weather_oo\\weather_oo.ino"
void setup() {
	Serial.begin(115200);
	delay(100);

	
	nvs.loadLogLevel();

	
	WiFi.onEvent(WiFiEvent);

	
	if (!LittleFS.begin(true)) {
		LOG_E("LittleFS Mount Failed");
		return;
	}
	else {
		LOG_I("LittleFS Mount OK");
	}

	
	hw.init();
	
	hw.setupLVGL();

	
	LOG_D("load languages");
	ss.load_language_from_nvs();

	
	String lang;
	nvs.loadLanguage(lang);
	LOG_D("taal: %s", lang);
	ll.load_locale_labels(lang);
	LOG_D("load labels done");

	
	LOG_D("init styles");
	st.init();
	LOG_D("create main screen");
	ms.create();
	LOG_D("create wifi config screen");
	wc.create();
	report_unlocalized_elements("wifi_cfg", wc.screen());
	LOG_D("create location screen");
	ls.create();
	report_unlocalized_elements("location_screen", ls.screen());
	LOG_D("create weather screen");
	wv.create();
	report_unlocalized_elements("weather_screen", wv.screen());	
	LOG_D("create weather details screen");
	wv.details_create();
	report_unlocalized_elements("weather_details", wv.details_screen());
	LOG_D("create flip clock screen");
	fc.create();
	report_unlocalized_elements("flip_clock", fc.screen());
	LOG_D("create wifi info screen");
	wi.create();
	report_unlocalized_elements("wifi_info", wi.screen());
	LOG_D("create status bar");
	sb.create();
	report_unlocalized_elements("status_bar", sb.bar());
	LOG_D("create settings screen");
	ss.create();
	report_unlocalized_elements("settings_screen", ss.screen());
	LOG_D("create explorer screen");
	es.create();
	report_unlocalized_elements("explorer_screen", es.screen());

	
	tm.init();

	LOG_D("create lvgl timer to check time every second ");
	fc.refresh_time = lv_timer_create(FlipClockScreen::checkTime, 1000, &fc);

	LOG_D("load the first screen");
	lv_screen_load(ms.get_screen());

	LOG_D("Start WiFi Manager (queue + task) before any WiFi.* usage");
	if (!wfm.wifi_mgr_start()) {
		LOG_E("WiFiMgr: start failed");
	}

	WiFi.setAutoReconnect(false);   
	
	WiFi.disconnect(true, true);    
	WiFi.mode(WIFI_MODE_NULL);
	delay(100);
	WiFi.mode(WIFI_MODE_STA);

	
	String nvs_ssid, nvs_pw;
	nvs.readWiFiCredentials(nvs_ssid, nvs_pw);

	if (nvs_ssid.length() > 0) {
		LOG_I("Credentials gevonden in NVS. Verbinden...");
		if (nvs_pw.length() > 0) {
			WiFi.begin(nvs_ssid.c_str(), nvs_pw.c_str());
		}
		else {
			WiFi.begin(nvs_ssid.c_str());
		}
	}
	else {
		LOG_I("Geen credentials gevonden in NVS. Start configuratiemodus.");
		wfm.wifi_mgr_post_show_config();
	}
}

void loop() {
	static uint32_t lastBeat = 0;
	if (millis() - lastBeat > 60000) {
		LOG_D("Still alive...");
		lastBeat = millis();
	}
	
	
	lv_timer_handler(); 

	
	sm.update();

	
	if (sb.got_update) {
		sb.got_update = false;
		sb.update();
	}

	
	if (fc.minute_has_passed) {
		fc.update_time_display();
		fc.minute_has_passed = false;
	}

	
	if (wg.status == WiFiGlobals::CONNECTED && wg.connection_completed_on_cfg_screen) {
		wg.connection_completed_on_cfg_screen = false;
		sm.back(); 
	}

	
	if (wg.status == WiFiGlobals::CONNECTED) {
		ws.tick();
		if (ws.hasNewData()) {
			wv.update_weather_screen_from_doc();
			ws.consumeNewData();
		}
	}

	
	if (ws.takeLastError(lasterror)) {
		LOG_E("OpenWeather: %s", lasterror.c_str());
	}

	
	if (tm.shouldSync()) {
		tm.sync();
	}

	delay(5);
}



