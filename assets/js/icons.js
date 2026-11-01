/* MolArgan — icon sprite (injected once so every page shares it; works from file:// too) */
(function(){
  var svg='<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs><symbol id="i-leaf" viewBox="0 0 24 24"><path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z"/><path d="M5 19c2-4 5-7 9-9"/></symbol>\n' +
    '    <symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></symbol>\n' +
    '    <symbol id="i-users" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.2c2.8.2 5 2.4 5 5.3"/></symbol>\n' +
    '    <symbol id="i-sparkle" viewBox="0 0 24 24"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 16v4M17 18h4"/></symbol>\n' +
    '    <symbol id="i-sprout" viewBox="0 0 24 24"><path d="M12 21v-8"/><path d="M12 13c0-4-3-6-7-6 0 4 3 6 7 6z"/><path d="M12 15c0-3.5 2.5-5.5 6-5.5 0 3.5-2.5 5.5-6 5.5z"/></symbol>\n' +
    '    <symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></symbol>\n' +
    '    <symbol id="i-box" viewBox="0 0 24 24"><path d="M3 8l9-5 9 5v8l-9 5-9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/></symbol>\n' +
    '    <symbol id="i-drop" viewBox="0 0 24 24"><path d="M12 3s6 6.2 6 10.500a6 6 0 0 1-12 0C6 9.200 12 3 12 3z"/><path d="M9.500 14a2.500 2.500 0 0 0 2 2.300"/></symbol>\n' +
    '    <symbol id="i-jar" viewBox="0 0 24 24"><path d="M8.500 4h7v3h-7z"/><path d="M7 7h10v12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z"/><path d="M7 12h10"/></symbol>\n' +
    '    <symbol id="i-honey" viewBox="0 0 24 24"><path d="M12 3l7.800 4.500v9L12 21l-7.800-4.500v-9z"/><path d="M12 8.500l3.200 1.800v3.400L12 15.500l-3.200-1.800v-3.400z"/></symbol>\n' +
    '    <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>\n' +
    '    <symbol id="i-home" viewBox="0 0 24 24"><path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/><path d="M10 20v-5h4v5"/></symbol>\n' +
    '    <symbol id="i-grid" viewBox="0 0 24 24"><rect x="4" y="4" width="6.500" height="6.500" rx="1.500"/><rect x="13.500" y="4" width="6.500" height="6.500" rx="1.500"/><rect x="4" y="13.500" width="6.500" height="6.500" rx="1.500"/><rect x="13.500" y="13.500" width="6.500" height="6.500" rx="1.500"/></symbol>\n' +
    '    <symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5.500"/><circle cx="12" cy="7.800" r=".6"/></symbol>\n' +
    '    <symbol id="i-phone" viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/></symbol>\n' +
    '    <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.500"/><path d="M16 16l4.500 4.500"/></symbol>\n' +
    '    <symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></symbol>\n' +
    '    <symbol id="i-check" viewBox="0 0 24 24"><path d="M5 12.500l4.500 4.500L19 7.500"/></symbol>\n' +
    '    <symbol id="i-wa" viewBox="0 0 24 24"><path style="fill:currentColor;stroke:none" d="M12 2a10 10 0 0 0-8.600 15.100L2 22l5-1.300A10 10 0 1 0 12 2zm0 18.200a8.200 8.200 0 0 1-4.200-1.200l-.3-.2-3 .8.8-2.900-.2-.3A8.200 8.200 0 1 1 12 20.200zM8.600 7.500c-.2 0-.5.100-.7.400-.3.300-.9.900-.9 2.100s.9 2.400 1 2.600c.1.200 1.800 2.800 4.400 3.900 2.100.8 2.500.7 3 .6.5-.1 1.500-.6 1.700-1.200.2-.6.2-1.100.1-1.200-.1-.1-.2-.2-.5-.3l-1.600-.8c-.2-.1-.4-.1-.6.100l-.7.900c-.1.200-.3.200-.5.100-.9-.4-2-1.200-2.800-2.500-.1-.2 0-.3.100-.4l.4-.5.200-.4v-.4l-.7-1.700c-.2-.4-.4-.4-.6-.4z"/></symbol>\n' +
    '    <symbol id="i-truck" viewBox="0 0 24 24"><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.500" r="1.800"/><circle cx="17" cy="17.500" r="1.800"/></symbol>\n' +
    '    <symbol id="i-trace" viewBox="0 0 24 24"><path d="M5 5h6v6H5zM13 13h6v6h-6z"/><path d="M11 8h3a3 3 0 0 1 3 3v2"/></symbol>\n' +
    '    <symbol id="i-hand" viewBox="0 0 24 24"><path d="M8 12V6a1.500 1.500 0 0 1 3 0v5M11 11V4.500a1.500 1.500 0 0 1 3 0V11M14 11V6a1.500 1.500 0 0 1 3 0v7a7 7 0 0 1-7 7h-.5a5 5 0 0 1-4-2L3 14.500a1.500 1.500 0 0 1 2.400-1.800L8 15"/></symbol>\n' +
    '    <symbol id="i-scale" viewBox="0 0 24 24"><path d="M12 4v16M7 20h10M5 8h14"/><path d="M5 8l-2.500 6a3 3 0 0 0 5 0zM19 8l-2.500 6a3 3 0 0 0 5 0z"/></symbol></defs></svg>';
  document.body.insertAdjacentHTML('afterbegin',svg);
})();
