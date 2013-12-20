(function(window) {
var Alinova = {
	doc:null,
	properties:{
		minDocumentHeight:500
	},
	addResizeListener:function(div,properties) {
		var self = this;
		window.addEventListener('resize',function() {
			div.style[properties] = window.innerHeight >= self.properties.minDocumentHeight ? window.innerHeight+"px" : self.properties.minDocumentHeight+"px";
		});
	},
	init:function(doc) {
		this.doc = doc;
		var mainPanel = doc.getElementById("main-panel");
		mainPanel.style.height = window.innerHeight+"px";
		this.addResizeListener(mainPanel,'height');
		var getStartedButton = doc.getElementById("getstarted");
		getStartedButton.addEventListener('click',function() {
			$('html,body').animate({scrollTop:$("#editorPanel").offset().top},1000);
		});
	}
};
window.Alinova = Alinova;
})(window);

window.addEventListener('load',function() {
	Alinova.init(document);
	Bloom.colorize();
});