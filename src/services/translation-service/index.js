const API_KEY="AIzaSyDED0bpTitv1LM8n6PJ5htmqCmbLLTP3rc";
const endpoints = {
    translate: "",
    detect: "detect",
    languages: "languages"
  };
  
class TranslationService {

      // Abstract API request function
      async makeApiRequest(endpoint, data, method) {
        url = "https://www.googleapis.com/language/translate/v2/" + endpoint;
        url += "?key=" + API_KEY;
      
        // If not listing languages, send text to translate
        if (endpoint !== endpoints.languages) {
          url += "&q=" + encodeURI(data.textToTranslate);
        }
      
        // If translating, send target and source languages
        if (endpoint === endpoints.translate) {
          url += "&target=" + data.targetLang;
          url += "&source=" + data.sourceLang;
        }
      
        // Return response from API
        let res = await fetch(
            url,
            {
                method: method,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data ? JSON.stringify(data) : ""
            }
        )
        return res;
      }
      
      // Translate
      async translate(text, sourceLg, targetLg) {
        data = {
            sourceLang: sourceLg,
            targetLang: targetLg,
            textToTranslate: text,
        };

        res = await this.makeApiRequest(endpoints.translate, data, 'POST');
        if (res.status == 200) {
            json = await res.json();
            //console.log("----------------------------", json);
            return json.data.translations[0].translatedText;
        }
        else {
            return "";
        }
      }
      
      // Detect language
    //   detect(data) {
    //     makeApiRequest(endpoints.detect, data, "GET").success(function(resp) {
    //       source = resp.data.detections[0][0].language;
    //       conf = resp.data.detections[0][0].confidence.toFixed(2) * 100;
      
    //       $(".source-lang option")
    //         .filter(function() {
    //           return $(this).val() === source; //To select Blue
    //         })
    //         .prop("selected", true);
    //       $.when(getLanguageNames()).then(function(data) {
    //         $("p.target").text(data[source] + " with " + conf + "% confidence");
    //       });
    //       $("h2.translation-heading").hide();
    //       $("h2.detection-heading, p").show();
    //     });
    //   }
      
      // Convert country code to country name
      getLanguageNames() {
        //return $.getJSON("https://api.myjson.com/bins/155kj1");
        return [];
      }
}

export default new TranslationService();
