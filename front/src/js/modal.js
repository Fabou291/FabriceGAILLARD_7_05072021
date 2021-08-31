/*function shutDownModals(e){
    let node = e.target;

    while( node != null && node.nodeType != Node.DOCUMENT_NODE){
        if([...node.classList].find(e => e == 'modal')) return;
        node = node.parentNode;
    }

    document .querySelectorAll('.modal.show').forEach(e => e.classList.remove('show'))
}

window.addEventListener('click', shutDownModals)
window.addEventListener('keyup', e => { if(e.code == 'Escape') shutDownModals(e); })*/

