(function(window) {
var Bloom = {
	lang:'js',
	color:function(a,b) {
		return "<span class='Bloom-"+Bloom.lang+"-"+b+"'>"+a+"</span>";
	},
	colorize:function(children) {
		var self = this;
		if(typeof children == "string" || !children) children = document.getElementsByClassName(children || "Bloom-colorize");
		for(var i=0;i<children.length;i++) {
			var lang = children[i].className.match(/Bloom\-lang\-[a-z\+0-9]+/gi);
			if(lang) {
				lang = lang[0].split("-lang-")[1];
				if(self.langs[lang]) self._lang = self.lang,self.lang = lang;
				else throw "Language Error: The language selected for Bloom div #"+(i+1)+" is not supported.";
			} else self.lang = self._lang || 'js';
			var code = children[i].children[0].innerHTML;
			var line = code.split("\n");
			for(var n=0;n<line.length-1;n++) {
				if(line[n].match(/\/\//gi)) {
					var temp = line[n].split("//");
					line[n] = self.langs[self.lang](temp[0])+self.color("//"+temp[1],"comment");
				} else {
					line[n] = self.langs[self.lang](line[n]);
				}
			}
			children[i].children[0].innerHTML = line.join("\n").replace(/\t/gi,'').replace(/  /gi,'&nbsp;&nbsp;&nbsp;&nbsp;');
		}
	},
	langs:{
		js:function(line) {
			var color = Bloom.color;
			line = line.replace(/(\"(.*)\")/gi,color("$1","string"));
			line = line.replace(/([0-9]+)/gi,color("$1","integer"));
		//	line = line.replace(//gi);
			return line;
		}
	}
};


window.Bloom = Bloom;
})(window);