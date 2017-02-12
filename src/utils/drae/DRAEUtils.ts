
export class DRAEUtils {

    public static baseUrl() {
        return "https://dle.rae.es/data";
    }

    public static searchUrl() {
        return this.baseUrl() + "/search";
    }

    public static fetchUrl() {
        return this.baseUrl() + "/fetch";
    }

    public static parseHtmlResponse = ( htmlResponse: string ) => {
        var html = htmlResponse.replace(/<p(.|\n)*?>/g, "<pre></pre>");
        html = html.replace(/<\/p>/g, "");
        html = html.replace(/<article(.|\n)*?>/g, "<pre></pre>");
        html = html.replace(/<\/article(.|\n)*?>/g, "");
        html = html.replace(/<header(.|\n)*?>/g, "<pre></pre><strong>");
        html = html.replace(/<\/header>/g, "</strong>");
        html = html.replace(/<mark(.|\n)*?>/g, "");
        html = html.replace(/<\/mark(.|\n)*?>/g, "");
        html = html.replace(/<sup(.|\n)*?>/g, "");
        html = html.replace(/<\/sup(.|\n)*?>/g, "");
        html = html.replace(/<abbr(.|\n)*?>/g, "");
        html = html.replace(/<\/abbr(.|\n)*?>/g, "");
        html = html.replace(/<span(.|\n)*?>/g, "");
        html = html.replace(/<\/span(.|\n)*?>/g, "");
        html = html.replace(/<u(.|\n)*?>/g, "");
        html = html.replace(/<\/u(.|\n)*?>/g, "");
        html = html.replace(/<a(.|\n)*?>/g, "<strong>");
        html = html.replace(/<\/a(.|\n)*?>/g, "</strong>");
        //html = html.replace(/class="(.|\n)*?"/g, "");
        html = html.replace(/<b(.|\n)*?>/g, "<strong>");
        html = html.replace(/<\/b(.|\n)*?>/g, "</strong>");

        return html;
    }

}