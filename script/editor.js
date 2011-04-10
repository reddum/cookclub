
(function (){

var invoker = function(docker, editorClassName, panelEle)
{
	var _inst = new myClass();
	_inst.init(docker, editorClassName, panelEle);
	
	return _inst;
};

function myClass(){};

function inBound(ele, event)
{
	var pd = ele.offset(), x = event.pageX, y = event.pageY;
	//jQuery('#jjj').text(pd.top + " , " + pd.left);
	
	return x >= pd.left && x <= pd.left + ele.width() && y >= pd.top && y <= pd.top + ele.height();
};

function isVisible(ele)
{
	return ele.is(":visible");
};

function createPanel()
{
	return null;
};

function deleteEditor(event)
{
	var panel = event.data.clz.ctrlPanel;
	
	panel.hide();
	panel.owner.remove();
	panel.owner = null;
};

function insertEditor(event)
{
	var panel = event.data.clz.ctrlPanel;
	var editor = event.data.clz.createEditor();	
	
	editor.insertAfter(panel);
};

function onEditorMouseOver(event)
{
	var editor = event.data.editor;
	var panel = event.data.clz.ctrlPanel;	
	
	if (panel.owner == editor) return;
	
	if (panel.owner != null)
	{
		var tmp = jQuery("<div></div>").insertAfter(panel);
		panel.hide();
		panel.owner.insertAfter(tmp);
		tmp.remove();
		
		panel.owner = null;			
	}
	
	panel.owner = editor;
	
	var tmp = jQuery("<div></div>").insertAfter(editor);
	panel.insertAfter(tmp);
	tmp.remove();
	
	jQuery(".__container", panel).append(editor);
	panel.show();
};

function onEditorMouseOut(event)
{
	return;

	var editor = event.data.editor;
	var panel = event.data.clz.ctrlPanel;	
	
	if (panel.owner == editor && !inBound(panel, event))
	{
		panel.hide();
	}
};

function onMoveAreaIn(event)
{
	//event.data.clz.docker.sortable({disabled:false});
	event.data.clz.docker.sortable({axis:'y', disabled:false, containment: event.data.clz.docker});
};

function onMoveAreaOut(event)
{
	event.data.clz.docker.sortable({disabled:true});
};

function onEditorStartSort(event, ui)
{
	//event.data.clz.ctrlPanel.hide();
};

myClass.prototype = {
	editorIndex: 0,
	
	docker: null,
	
	editorClassName: null,
	
	placeHolderClassName: null,
	
	editorTPL: null,
	
	ctrlPanel: null,
	
	init: function(docker, editorClassName, panelEle) 
	{
		this.editorClassName = editorClassName;
		this.docker = jQuery(docker);
		if (this.docker.length == 0) return;	// handle error.
	
		this.ctrlPanel = this.createPanel(panelEle);
		var editors = jQuery(editorClassName, docker);
		if (editors.length != 1) return;	// handle error.
		
		this.editorTPL = editors;
		this.editorTPL.hide();
		
		for (var i = 0; i < 2; ++i)
		{
			var editor = this.createEditor();
			this.docker.append(editor);
		}

		this.docker.sortable({axis:'y', placeholder: "placeholder", disabled:true, containment: docker});		
	},
	
	createPanel: function(panelEle)
	{
		var panel = jQuery(panelEle);
		panel.hide();
		
		panel.bind(
			'mouseout',
			{clz : this},
			function(event)
			{						
				var panel = event.data.clz.ctrlPanel;
			
				if (panel.is(":visible") && !inBound(panel, event))
				{	
					var tmp = jQuery("<div></div>").insertAfter(panel);
					panel.hide();
					panel.owner.insertAfter(tmp);
					tmp.remove();
					
					panel.owner = null;			
				}
			}
		);

		jQuery(".__del", panel).bind("click", {clz: this}, deleteEditor );
		jQuery(".__insert", panel).bind("click", {clz: this}, insertEditor );
		jQuery(".__movearea", panel).bind("mouseover", {clz: this}, onMoveAreaIn );
		jQuery(".__movearea", panel).bind("mouseout", {clz: this}, onMoveAreaOut );		

		return panel;
	},
	
	createEditor: function()
	{
		// make the first editor.
		var cloneEditor = this.editorTPL.clone();			
		this.initEditor(cloneEditor);
		cloneEditor.show();
		
		return cloneEditor;
	},

	initEditor: function(editor)
	{
		editor.bind('mouseover', {editor: editor, clz: this}, onEditorMouseOver );
		
		// for debug.
		jQuery(".__id", editor).text(++this.editorIndex);		
	},
	
	
};

window.yourClass = invoker;	
})();

