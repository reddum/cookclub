<?php
	// template.
	
drupal_add_library('system', 'ui.sortable');
drupal_add_css(drupal_get_path('module', 'reciple') . '/style/editor.css');

$imagebase = '/' . drupal_get_path('module', 'reciple') . '/images/';\

drupal_add_js(drupal_get_path('module', 'reciple') . '/script/editor.js', 'file');
?>

<script type="text/javascript">


jQuery(document).ready(function() {
	var aaa = yourClass('#StepEditor', ".reciple_editor", "#rpStepPanel");
	var bbb = yourClass('#IngredientEditor', ".reciple_editor", "#rpIngredientPanel");
});


</script>

<hr>

<span id="jjj"></span>	
<div>
	<?php
	if (isset($img_url))
	{
	?>
		<img src="<?php print $img_url; ?>">
	<?php 
	}
	?>
</div>
	
<div>	
	
<style type="text/css">

</style>

<div style="padding: 3px; width: 800px;">
	<div style="width:400px; float: left;">
	
		<div>Ingredients:</div>
		<div id="IngredientEditor">
		<div class="reciple_editor">
			<div>
				<span class="__id"></span>
			</div>
			<div><textarea></textarea></div>
			<div><img src="img/pasta.jpg" height="75" width="75"></div>
		</div>
		</div>
		
	</div>
	<div style="width:400px; float: left;">
	
		<div>Steps:</div>
		<div id="StepEditor">
		<div class="reciple_editor">
			<div>
				<span class="__id"></span>
			</div>
			<div><textarea></textarea></div>
			<div><img src="img/pasta.jpg" height="75" width="75"></div>
		</div>
		</div>

	</div>
	<div style="clear: both"></div>
</div>

<div id="rpStepPanel" class="reciple_editor_panel">
<div>
	<div class="rp_header">
		<span class="__movearea" style="background-color:yellow; cursor:move;"><img src="" width="150" height="10"></span>
		<a class="__del imgptr"><img src="<?php print $imagebase;?>redt_delete.gif"></a>
		<a class="__insert imgptr"><img src="<?php print $imagebase;?>redt_insert.png"></a>
	</div>
	<div class="rp_leftcol"></div>
	<div class="rp_content __container"></div>
	<div class="rp_rightcol"></div>
	<div class="rp_footer"></div>
</div>
</div>

<div id="rpIngredientPanel" class="reciple_editor_panel">
<div>
	<div class="rp_header">
		<span class="__movearea" style="background-color:yellow; cursor:move;">&nbsp;<img src="" width="150" height="10"></span>
		<a class="__del imgptr"><img src="<?php print $imagebase;?>redt_delete.gif"></a>
		<a class="__insert imgptr"><img src="<?php print $imagebase;?>redt_insert.png"></a>
	</div>
	<div class="rp_leftcol"></div>
	<div class="rp_content __container"></div>
	<div class="rp_rightcol"></div>
	<div class="rp_footer"></div>
</div>
</div>

