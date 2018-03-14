var Lang = {
	getLocale: function() {
		return getInputParams("LOCALE");
	},

	getBundle: function(key) {
		var bundle = getResourceBundle(key);
		
		if (this.checkBundle(bundle)) {
			return bundle;
		} else {
			return false;
		}
	},

	checkBundle: function(bundle) {
		if ((typeof bundle == "string") && (bundle != "")) {
			return true;
		} else {
			return false;
		}
	},

	keyReturn: function(key) {
		return "[" + key + "]";
	},

	trans: function(key, replace) {
		var bundle = this.getBundle(key);

		if (bundle === false) {
			return this.keyReturn(key);
		}

		return this.makeReplacements(bundle, replace);
	},

	transChoice: function(key, number, replace) {
		var bundle = this.getBundle(key);

		if (bundle === false) {
			return this.keyReturn(key);
		}

		bundle = this.getBundleByRange(bundle, number);

		if (bundle === false) {
			return this.keyReturn(key);
		}

		return this.makeReplacements(bundle, replace);
	},

	getBundleByRange: function(bundle, number) {
		var bundles = bundle.split("|");
		
		//Вывод бандла в зависимости от локали пользователя 
		if (bundle.substr(0, 1) != "{") {
			var locale = this.getLocale();

			if (locale == "") {
				return false;
			}

			var index = this.getPluralIndex(locale, number);

			if (index in bundles) {
				return bundles[index].trim();
			} else {
				return bundles[0].trim();
			}
		}

		//Если заданы точные правила, которые указывают на языковые строки для числовых промежутков
		for (var i = 0; i < bundles.length; i++) {
			var matches = bundles[i].match(/\{([0-9,\-]+)\}(.*)$/);

			if (matches == null) {
				continue;
			}

			var range = matches[1],
				bundle = matches[2].trim();

			var ranges = range.split(",");

			for (var j = 0; j < ranges.length; j++) {
				var num = ranges[j], pos;
				
				if ((pos = num.indexOf("-", 1)) == -1) {
					if (number == parseInt(num)) {
						return bundle;
					}
				} else {
					var start = num.substr(0, pos),
						end = num.substr(pos + 1);
					
					if (number >= parseInt(start) && (parseInt(end) >= number || end == "")) {
						return bundle;
					}
				}
			}
		}

		return false;
	},

	makeReplacements: function(bundle, replace) {
		if (typeof replace != "object") {
			return bundle;
		}
		
		for (var attr in replace) {
			var regex = new RegExp("\\{\\{" + attr + "\\}\\}", "gi");
			bundle = bundle.replace(regex, replace[attr]);
		}

		return bundle;
	},

	getPluralIndex: function(locale, number) {
		switch (locale) {
			case 'az':
			case 'az_AZ':
			case 'bo':
			case 'bo_CN':
			case 'bo_IN':
			case 'dz':
			case 'dz_BT':
			case 'id':
			case 'id_ID':
			case 'ja':
			case 'ja_JP':
			case 'jv':
			case 'ka':
			case 'ka_GE':
			case 'km':
			case 'km_KH':
			case 'kn':
			case 'kn_IN':
			case 'ko':
			case 'ko_KR':
			case 'ms':
			case 'ms_MY':
			case 'th':
			case 'th_TH':
			case 'tr':
			case 'tr_CY':
			case 'tr_TR':
			case 'vi':
			case 'vi_VN':
			case 'zh':
			case 'zh_CN':
			case 'zh_HK':
			case 'zh_SG':
			case 'zh_TW':
				return 0;
			case 'af':
			case 'af_ZA':
			case 'bn':
			case 'bn_BD':
			case 'bn_IN':
			case 'bg':
			case 'bg_BG':
			case 'ca':
			case 'ca_AD':
			case 'ca_ES':
			case 'ca_FR':
			case 'ca_IT':
			case 'da':
			case 'da_DK':
			case 'de':
			case 'de_AT':
			case 'de_BE':
			case 'de_CH':
			case 'de_DE':
			case 'de_LI':
			case 'de_LU':
			case 'el':
			case 'el_CY':
			case 'el_GR':
			case 'en':
			case 'en_AG':
			case 'en_AU':
			case 'en_BW':
			case 'en_CA':
			case 'en_DK':
			case 'en_GB':
			case 'en_HK':
			case 'en_IE':
			case 'en_IN':
			case 'en_NG':
			case 'en_NZ':
			case 'en_PH':
			case 'en_SG':
			case 'en_US':
			case 'en_ZA':
			case 'en_ZM':
			case 'en_ZW':
			case 'eo':
			case 'eo_US':
			case 'es':
			case 'es_AR':
			case 'es_BO':
			case 'es_CL':
			case 'es_CO':
			case 'es_CR':
			case 'es_CU':
			case 'es_DO':
			case 'es_EC':
			case 'es_ES':
			case 'es_GT':
			case 'es_HN':
			case 'es_MX':
			case 'es_NI':
			case 'es_PA':
			case 'es_PE':
			case 'es_PR':
			case 'es_PY':
			case 'es_SV':
			case 'es_US':
			case 'es_UY':
			case 'es_VE':
			case 'et':
			case 'et_EE':
			case 'eu':
			case 'eu_ES':
			case 'eu_FR':
			case 'fa':
			case 'fa_IR':
			case 'fi':
			case 'fi_FI':
			case 'fo':
			case 'fo_FO':
			case 'fur':
			case 'fur_IT':
			case 'fy':
			case 'fy_DE':
			case 'fy_NL':
			case 'gl':
			case 'gl_ES':
			case 'gu':
			case 'gu_IN':
			case 'ha':
			case 'ha_NG':
			case 'he':
			case 'he_IL':
			case 'hu':
			case 'hu_HU':
			case 'is':
			case 'is_IS':
			case 'it':
			case 'it_CH':
			case 'it_IT':
			case 'ku':
			case 'ku_TR':
			case 'lb':
			case 'lb_LU':
			case 'ml':
			case 'ml_IN':
			case 'mn':
			case 'mn_MN':
			case 'mr':
			case 'mr_IN':
			case 'nah':
			case 'nb':
			case 'nb_NO':
			case 'ne':
			case 'ne_NP':
			case 'nl':
			case 'nl_AW':
			case 'nl_BE':
			case 'nl_NL':
			case 'nn':
			case 'nn_NO':
			case 'no':
			case 'om':
			case 'om_ET':
			case 'om_KE':
			case 'or':
			case 'or_IN':
			case 'pa':
			case 'pa_IN':
			case 'pa_PK':
			case 'pap':
			case 'pap_AN':
			case 'pap_AW':
			case 'pap_CW':
			case 'ps':
			case 'ps_AF':
			case 'pt':
			case 'pt_BR':
			case 'pt_PT':
			case 'so':
			case 'so_DJ':
			case 'so_ET':
			case 'so_KE':
			case 'so_SO':
			case 'sq':
			case 'sq_AL':
			case 'sq_MK':
			case 'sv':
			case 'sv_FI':
			case 'sv_SE':
			case 'sw':
			case 'sw_KE':
			case 'sw_TZ':
			case 'ta':
			case 'ta_IN':
			case 'ta_LK':
			case 'te':
			case 'te_IN':
			case 'tk':
			case 'tk_TM':
			case 'ur':
			case 'ur_IN':
			case 'ur_PK':
			case 'zu':
			case 'zu_ZA':
				return (number == 1) ? 0 : 1;
			case 'am':
			case 'am_ET':
			case 'bh':
			case 'fil':
			case 'fil_PH':
			case 'fr':
			case 'fr_BE':
			case 'fr_CA':
			case 'fr_CH':
			case 'fr_FR':
			case 'fr_LU':
			case 'gun':
			case 'hi':
			case 'hi_IN':
			case 'hy':
			case 'hy_AM':
			case 'ln':
			case 'ln_CD':
			case 'mg':
			case 'mg_MG':
			case 'nso':
			case 'nso_ZA':
			case 'ti':
			case 'ti_ER':
			case 'ti_ET':
			case 'wa':
			case 'wa_BE':
			case 'xbr':
				return ((number == 0) || (number == 1)) ? 0 : 1;
			case 'be':
			case 'be_BY':
			case 'bs':
			case 'bs_BA':
			case 'hr':
			case 'hr_HR':
			case 'ru':
			case 'ru_RU':
			case 'ru_UA':
			case 'sr':
			case 'sr_ME':
			case 'sr_RS':
			case 'uk':
			case 'uk_UA':
				return ((number % 10 == 1) && (number % 100 != 11)) ? 0 : (((number % 10 >= 2) && (number % 10 <= 4) && ((number % 100 < 10) || (number % 100 >= 20))) ? 1 : 2);
			case 'cs':
			case 'cs_CZ':
			case 'sk':
			case 'sk_SK':
				return (number == 1) ? 0 : (((number >= 2) && (number <= 4)) ? 1 : 2);
			case 'ga':
			case 'ga_IE':
				return (number == 1) ? 0 : ((number == 2) ? 1 : 2);
			case 'lt':
			case 'lt_LT':
				return ((number % 10 == 1) && (number % 100 != 11)) ? 0 : (((number % 10 >= 2) && ((number % 100 < 10) || (number % 100 >= 20))) ? 1 : 2);
			case 'sl':
			case 'sl_SI':
				return (number % 100 == 1) ? 0 : ((number % 100 == 2) ? 1 : (((number % 100 == 3) || (number % 100 == 4)) ? 2 : 3));
			case 'mk':
			case 'mk_MK':
				return (number % 10 == 1) ? 0 : 1;
			case 'mt':
			case 'mt_MT':
				return (number == 1) ? 0 : (((number == 0) || ((number % 100 > 1) && (number % 100 < 11))) ? 1 : (((number % 100 > 10) && (number % 100 < 20)) ? 2 : 3));
			case 'lv':
			case 'lv_LV':
				return (number == 0) ? 0 : (((number % 10 == 1) && (number % 100 != 11)) ? 1 : 2);
			case 'pl':
			case 'pl_PL':
				return (number == 1) ? 0 : (((number % 10 >= 2) && (number % 10 <= 4) && ((number % 100 < 12) || (number % 100 > 14))) ? 1 : 2);
			case 'cy':
			case 'cy_GB':
				return (number == 1) ? 0 : ((number == 2) ? 1 : (((number == 8) || (number == 11)) ? 2 : 3));
			case 'ro':
			case 'ro_RO':
				return (number == 1) ? 0 : (((number == 0) || ((number % 100 > 0) && (number % 100 < 20))) ? 1 : 2);
			case 'ar':
			case 'ar_AE':
			case 'ar_BH':
			case 'ar_DZ':
			case 'ar_EG':
			case 'ar_IN':
			case 'ar_IQ':
			case 'ar_JO':
			case 'ar_KW':
			case 'ar_LB':
			case 'ar_LY':
			case 'ar_MA':
			case 'ar_OM':
			case 'ar_QA':
			case 'ar_SA':
			case 'ar_SD':
			case 'ar_SS':
			case 'ar_SY':
			case 'ar_TN':
			case 'ar_YE':
				return (number == 0) ? 0 : ((number == 1) ? 1 : ((number == 2) ? 2 : (((number % 100 >= 3) && (number % 100 <= 10)) ? 3 : (((number % 100 >= 11) && (number % 100 <= 99)) ? 4 : 5))));
			default:
				return 0;
		}
	}
}