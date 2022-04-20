document.addEventListener('copy', function (event) {
  var selection = window.getSelection();

  if (selection.isCollapsed) {
    return; // default action OK if selection is empty
  }

  var fragment = selection.getRangeAt(0).cloneContents();

  if (fragment.querySelector('.katex-mathml')) {

    // 删除干扰项
    let katexHtml = fragment.querySelectorAll('.katex-html');
    for (let i = 0; i < katexHtml.length; i++) {
      katexHtml[i].remove(null)
    }

    // 提取关键项，并添加$
    let mathHtml = fragment.querySelectorAll("math");
    for (let i = 0; i < mathHtml.length; i++) {
      let element = mathHtml[i];

      // 提取关键项，只要lastChild
      let text = element.lastChild.textContent;

      if(element.getAttribute('display') == 'block'){
        element.innerHTML = `$$${text.replace(/[\r\n]$/, "")}$$`;
      }
      else{
        element.innerHTML = `$${text}$`;
      }
    }
  }

  // 修改剪贴板
  event.clipboardData.setData('text/plain', fragment.textContent); // Prevent normal copy handling.

  console.log(fragment.textContent);

  event.preventDefault();
});