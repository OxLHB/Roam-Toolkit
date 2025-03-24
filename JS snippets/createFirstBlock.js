const onClick = async () => {
    const pageUid = await window.roamAlphaAPI.ui.mainWindow.getOpenPageOrBlockUid();
  const uid = window.roamAlphaAPI.util.generateUID();
    await window
.roamAlphaAPI
.createBlock(
  {"location": 
      {"parent-uid": pageUid, 
       "order": 0}, 
   "block": 
      {"string": "", "block-uid": uid }});
   
      const t = window.roamAlphaAPI.data.fast.q(
    `[:find (pull ?c [:block/uid]) :where [?p :block/uid "${pageUid}"] [?p :block/children ?c] [?c :block/order 0] ]`
  )?.[0]?.[0]
?.[":block/uid"] || ""
    window.roamAlphaAPI.ui.setBlockFocusAndSelection(
{location: { "block-uid": t, "window-id": 'main-window' },
 })
  }

const handler = (e) => {
    if(e.ctrlKey && e.shiftKey && e.code === "Enter") {
      onClick();
      onClick();
     }
   };
document.addEventListener("keydown", handler)