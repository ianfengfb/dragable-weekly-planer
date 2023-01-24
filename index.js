var btn_red = document.querySelectorAll('.add_task_red');
var btn_green = document.querySelectorAll('.add_task_green');
var btn_blue = document.querySelectorAll('.add_task_blue');
var remove = document.querySelector('.draggable');

function dragStart(e) {
    this.style.opacity = '0.4';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
};

function dragEnter(e) {
    this.classList.add('over');
}

function dragLeave(e) {
    e.stopPropagation();
    this.classList.remove('over');
}

function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function dragDrop(e) {
    if (dragSrcEl != this) {

        this.parentNode.insertBefore(dragSrcEl, this);

    }
    return false;
}

function dragEnd(e) {
    var listItens = document.querySelectorAll('.draggable');
    [].forEach.call(listItens, function (item) {
        item.classList.remove('over');
    });
    this.style.opacity = '1';
}

function addEventsDragAndDrop(el) {
    el.addEventListener('dragstart', dragStart, false);
    el.addEventListener('dragenter', dragEnter, false);
    el.addEventListener('dragover', dragOver, false);
    el.addEventListener('dragleave', dragLeave, false);
    el.addEventListener('drop', dragDrop, false);
    el.addEventListener('dragend', dragEnd, false);
}

var listItens = document.querySelectorAll('.draggable');
[].forEach.call(listItens, function (item) {
    addEventsDragAndDrop(item);
});

function addNewItem() {
    var newItem = $(this).parent().siblings("input").val();
    var addnewClass = $(this).attr('class');
    if (newItem != '') {
        var ul = $(this).parent().parent().next();
        var li = $('<li class="draggable" draggable="true">' + newItem + '<i class="fa-solid fa-check float-end list_check me-2 mt-3"></i></li>').appendTo(ul);
        $(this).parent().siblings("input").val('');
        switch (addnewClass) {
            case 'add_task_red':
                li.addClass('draggable draggable_red');
                break;
            case 'add_task_blue':
                li.addClass('draggable draggable_blue');
                break;
            case 'add_task_green':
                li.addClass('draggable draggable_green');
                break;
            default:
        }


        //   document.querySelector('.input').value = '';
        //   var li = document.createElement('li');
        //   var attr = document.createAttribute('draggable');

        //   li.className = 'draggable';
        //   attr.value = 'true';
        //   li.setAttributeNode(attr);
        //   li.appendChild(document.createTextNode(newItem));
        //   ul.appendChild(li);
        var newUl = this.parentNode.parentNode.nextSibling.nextSibling;

        var newLi = newUl.children[newUl.children.length - 1];

        addEventsDragAndDrop(newLi);
    }

}

btn_red.forEach(element => element.addEventListener('click', addNewItem));
btn_blue.forEach(element => element.addEventListener('click', addNewItem));
btn_green.forEach(element => element.addEventListener('click', addNewItem));

$('.draggable_list').on('click', 'i', function (e) {
    $(this).parent().removeClass('draggable_red draggable_green draggable_blue');
    $(this).parent().addClass('draggable_grey');
    $(this).parent().parent().append($(this).parent());
})