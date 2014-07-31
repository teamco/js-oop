Ext.data.JsonP.Resizable({"tagname":"class","name":"Resizable","autodetected":{},"files":[{"filename":"widget.resize.js","href":"widget.resize.html#Resizable"}],"extends":"Interactions","params":[{"tagname":"params","type":"Widget","name":"scope","doc":"\n","html_type":"<a href=\"#!/api/Widget\" rel=\"Widget\" class=\"docClass\">Widget</a>"}],"owner":"Widget.interactions","members":[{"name":"$scope","tagname":"property","owner":"Resizable","id":"property-S-scope","meta":{}},{"name":"deltaHeight","tagname":"property","owner":"Interactions","id":"property-deltaHeight","meta":{}},{"name":"deltaLeft","tagname":"property","owner":"Interactions","id":"property-deltaLeft","meta":{}},{"name":"deltaTop","tagname":"property","owner":"Interactions","id":"property-deltaTop","meta":{}},{"name":"deltaWidth","tagname":"property","owner":"Interactions","id":"property-deltaWidth","meta":{}},{"name":"scope","tagname":"property","owner":"Resizable","id":"property-scope","meta":{}},{"name":"widget","tagname":"property","owner":"Interactions","id":"property-widget","meta":{}},{"name":"constructor","tagname":"method","owner":"Resizable","id":"method-constructor","meta":{}},{"name":"_getNW","tagname":"method","owner":"Interactions","id":"method-_getNW","meta":{"private":true}},{"name":"_getSE","tagname":"method","owner":"Interactions","id":"method-_getSE","meta":{"private":true}},{"name":"checkPermission","tagname":"method","owner":"Interactions","id":"method-checkPermission","meta":{}},{"name":"create","tagname":"method","owner":"Resizable","id":"method-create","meta":{}},{"name":"debugUI","tagname":"method","owner":"Interactions","id":"method-debugUI","meta":{}},{"name":"destroy","tagname":"method","owner":"Resizable","id":"method-destroy","meta":{}},{"name":"disable","tagname":"method","owner":"Resizable","id":"method-disable","meta":{}},{"name":"enable","tagname":"method","owner":"Resizable","id":"method-enable","meta":{}},{"name":"getDirectionE","tagname":"method","owner":"Interactions","id":"method-getDirectionE","meta":{}},{"name":"getDirectionN","tagname":"method","owner":"Interactions","id":"method-getDirectionN","meta":{}},{"name":"getDirectionS","tagname":"method","owner":"Interactions","id":"method-getDirectionS","meta":{}},{"name":"getDirectionW","tagname":"method","owner":"Interactions","id":"method-getDirectionW","meta":{}},{"name":"getResizeDirection","tagname":"method","owner":"Interactions","id":"method-getResizeDirection","meta":{}},{"name":"init","tagname":"method","owner":"Resizable","id":"method-init","meta":{}},{"name":"isDisabled","tagname":"method","owner":"Interactions","id":"method-isDisabled","meta":{}},{"name":"isEnabled","tagname":"method","owner":"Interactions","id":"method-isEnabled","meta":{}},{"name":"resize","tagname":"method","owner":"Resizable","id":"method-resize","meta":{}},{"name":"start","tagname":"method","owner":"Resizable","id":"method-start","meta":{}},{"name":"stop","tagname":"method","owner":"Resizable","id":"method-stop","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-Resizable","short_doc":"Define Resize ...","component":false,"superclasses":["Interactions"],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/Interactions' rel='Interactions' class='docClass'>Interactions</a><div class='subclass '><strong>Resizable</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/widget.resize.html#Resizable' target='_blank'>widget.resize.js</a></div></pre><div class='doc-contents'><p>Define Resize</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>scope</span> : <a href=\"#!/api/Widget\" rel=\"Widget\" class=\"docClass\">Widget</a><div class='sub-desc'>\n</div></li></ul></div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-S-scope' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Resizable'>Resizable</span><br/><a href='source/widget.resize.html#Resizable-property-S-scope' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Resizable-property-S-scope' class='name expandable'>$scope</a> : jQuery<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Define widget jquery element</p>\n</div><div class='long'><p>Define widget jquery element</p>\n</div></div></div><div id='property-deltaHeight' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Interactions' rel='Interactions' class='defined-in docClass'>Interactions</a><br/><a href='source/Interactions.html#Interactions-property-deltaHeight' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Interactions-property-deltaHeight' class='name expandable'>deltaHeight</a> : number<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Set delta width</p>\n</div><div class='long'><p>Set delta width</p>\n</div></div></div><div id='property-deltaLeft' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Interactions' rel='Interactions' class='defined-in docClass'>Interactions</a><br/><a href='source/Interactions.html#Interactions-property-deltaLeft' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Interactions-property-deltaLeft' class='name expandable'>deltaLeft</a> : number<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Set delta left</p>\n</div><div class='long'><p>Set delta left</p>\n</div></div></div><div id='property-deltaTop' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Interactions' rel='Interactions' class='defined-in docClass'>Interactions</a><br/><a href='source/Interactions.html#Interactions-property-deltaTop' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Interactions-property-deltaTop' class='name expandable'>deltaTop</a> : number<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Set delta top</p>\n</div><div class='long'><p>Set delta top</p>\n</div></div></div><div id='property-deltaWidth' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Interactions' rel='Interactions' class='defined-in docClass'>Interactions</a><br/><a href='source/Interactions.html#Interactions-property-deltaWidth' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Interactions-property-deltaWidth' class='name expandable'>deltaWidth</a> : number<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Set delta width</p>\n</div><div class='long'><p>Set delta width</p>\n</div></div></div><div id='property-scope' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Resizable'>Resizable</span><br/><a href='source/widget.resize.html#Resizable-property-scope' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Resizable-property-scope' class='name expandable'>scope</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Define scope</p>\n</div><div class='long'><p>Define scope</p>\n<p>Overrides: <a href=\"#!/api/Interactions-property-scope\" rel=\"Interactions-property-scope\" class=\"docClass\">Interactions.scope</a></p></div></div></div><div id='property-widget' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Interactions' rel='Interactions' class='defined-in docClass'>Interactions</a><br/><a href='source/Interactions.html#Interactions-property-widget' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Interactions-property-widget' class='name expandable'>widget</a> : <a href=\"#!/api/Widget\" rel=\"Widget\" class=\"docClass\">Widget</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>Define widget</p>\n</div><div class='long'><p>Define widget</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Resizable'>Resizable</span><br/><a href='source/widget.resize.html#Resizable-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Resizable-method-constructor' class='name expandable'>Resizable</a>( <span class='pre'></span> ) : <a href=\"#!/api/Resizable\" rel=\"Resizable\" class=\"docClass\">Resizable</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Resizable\" rel=\"Resizable\" class=\"docClass\">Resizable</a></span><div class='sub-desc'>\n</div></li></ul><p>Overrides: <a href=\"#!/api/Interactions-method-constructor\" rel=\"Interactions-method-constructor\" class=\"docClass\">Interactions.constructor</a></p></div></div></div><div id='method-_getNW' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Interactions' rel='Interactions' class='defined-in docClass'>Interactions</a><br/><a href='source/Interactions.html#Interactions-method-_getNW' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Interactions-method-_getNW' class='name expandable'>_getNW</a>( <span class='pre'>side, dir</span> ) : boolean<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Get North/West direction ...</div><div class='long'><p>Get North/West direction</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>side</span> : number<div class='sub-desc'>\n</div></li><li><span class='pre'>dir</span> : number<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-_getSE' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Interactions' rel='Interactions' class='defined-in docClass'>Interactions</a><br/><a href='source/Interactions.html#Interactions-method-_getSE' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Interactions-method-_getSE' class='name expandable'>_getSE</a>( <span class='pre'>side, dir</span> ) : boolean<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Get South/East direction ...</div><div class='long'><p>Get South/East direction</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>side</span> : number<div class='sub-desc'>\n</div></li><li><span class='pre'>dir</span> : number<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-checkPermission' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Interactions' rel='Interactions' class='defined-in docClass'>Interactions</a><br/><a href='source/Interactions.html#Interactions-method-checkPermission' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Interactions-method-checkPermission' class='name expandable'>checkPermission</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Check permission ...</div><div class='long'><p>Check permission</p>\n</div></div></div><div id='method-create' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Resizable'>Resizable</span><br/><a href='source/widget.resize.html#Resizable-method-create' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Resizable-method-create' class='name expandable'>create</a>( <span class='pre'>event, ui</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Create resize ...</div><div class='long'><p>Create resize</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>event</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>ui</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-debugUI' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Interactions' rel='Interactions' class='defined-in docClass'>Interactions</a><br/><a href='source/Interactions.html#Interactions-method-debugUI' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Interactions-method-debugUI' class='name expandable'>debugUI</a>( <span class='pre'>event, ui</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Debug UI ...</div><div class='long'><p>Debug UI</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>event</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>ui</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-destroy' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Resizable'>Resizable</span><br/><a href='source/widget.resize.html#Resizable-method-destroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Resizable-method-destroy' class='name expandable'>destroy</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Destroy resize ...</div><div class='long'><p>Destroy resize</p>\n</div></div></div><div id='method-disable' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Resizable'>Resizable</span><br/><a href='source/widget.resize.html#Resizable-method-disable' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Resizable-method-disable' class='name expandable'>disable</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Disable resize ...</div><div class='long'><p>Disable resize</p>\n</div></div></div><div id='method-enable' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Resizable'>Resizable</span><br/><a href='source/widget.resize.html#Resizable-method-enable' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Resizable-method-enable' class='name expandable'>enable</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Enable resize ...</div><div class='long'><p>Enable resize</p>\n</div></div></div><div id='method-getDirectionE' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Interactions' rel='Interactions' class='defined-in docClass'>Interactions</a><br/><a href='source/Interactions.html#Interactions-method-getDirectionE' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Interactions-method-getDirectionE' class='name expandable'>getDirectionE</a>( <span class='pre'>ui</span> ) : {width: number}<span class=\"signature\"></span></div><div class='description'><div class='short'>Get East ...</div><div class='long'><p>Get East</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>ui</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>{width: number}</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getDirectionN' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Interactions' rel='Interactions' class='defined-in docClass'>Interactions</a><br/><a href='source/Interactions.html#Interactions-method-getDirectionN' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Interactions-method-getDirectionN' class='name expandable'>getDirectionN</a>( <span class='pre'>ui</span> ) : {height: number, top: number}<span class=\"signature\"></span></div><div class='description'><div class='short'>Get North ...</div><div class='long'><p>Get North</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>ui</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>{height: number, top: number}</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getDirectionS' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Interactions' rel='Interactions' class='defined-in docClass'>Interactions</a><br/><a href='source/Interactions.html#Interactions-method-getDirectionS' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Interactions-method-getDirectionS' class='name expandable'>getDirectionS</a>( <span class='pre'>ui</span> ) : {height: number}<span class=\"signature\"></span></div><div class='description'><div class='short'>Get South ...</div><div class='long'><p>Get South</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>ui</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>{height: number}</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getDirectionW' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Interactions' rel='Interactions' class='defined-in docClass'>Interactions</a><br/><a href='source/Interactions.html#Interactions-method-getDirectionW' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Interactions-method-getDirectionW' class='name expandable'>getDirectionW</a>( <span class='pre'>ui</span> ) : {left: number, width: number}<span class=\"signature\"></span></div><div class='description'><div class='short'>Get West ...</div><div class='long'><p>Get West</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>ui</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>{left: number, width: number}</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getResizeDirection' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Interactions' rel='Interactions' class='defined-in docClass'>Interactions</a><br/><a href='source/Interactions.html#Interactions-method-getResizeDirection' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Interactions-method-getResizeDirection' class='name expandable'>getResizeDirection</a>( <span class='pre'>ui</span> ) : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">string</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Get resize direction ...</div><div class='long'><p>Get resize direction</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>ui</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">string</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-init' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Resizable'>Resizable</span><br/><a href='source/widget.resize.html#Resizable-method-init' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Resizable-method-init' class='name expandable'>init</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Init resizable ...</div><div class='long'><p>Init resizable</p>\n</div></div></div><div id='method-isDisabled' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Interactions' rel='Interactions' class='defined-in docClass'>Interactions</a><br/><a href='source/Interactions.html#Interactions-method-isDisabled' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Interactions-method-isDisabled' class='name expandable'>isDisabled</a>( <span class='pre'></span> ) : boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Check if disabled ...</div><div class='long'><p>Check if disabled</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-isEnabled' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Interactions' rel='Interactions' class='defined-in docClass'>Interactions</a><br/><a href='source/Interactions.html#Interactions-method-isEnabled' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Interactions-method-isEnabled' class='name expandable'>isEnabled</a>( <span class='pre'></span> ) : boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Check if enabled ...</div><div class='long'><p>Check if enabled</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-resize' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Resizable'>Resizable</span><br/><a href='source/widget.resize.html#Resizable-method-resize' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Resizable-method-resize' class='name expandable'>resize</a>( <span class='pre'>event, ui</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>On resize event ...</div><div class='long'><p>On resize event</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>event</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>ui</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-start' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Resizable'>Resizable</span><br/><a href='source/widget.resize.html#Resizable-method-start' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Resizable-method-start' class='name expandable'>start</a>( <span class='pre'>event, ui</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Start resize ...</div><div class='long'><p>Start resize</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>event</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>ui</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-stop' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Resizable'>Resizable</span><br/><a href='source/widget.resize.html#Resizable-method-stop' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Resizable-method-stop' class='name expandable'>stop</a>( <span class='pre'>event, ui</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Stop resize ...</div><div class='long'><p>Stop resize</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>event</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>ui</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});