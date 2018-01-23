(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/tables/jsgrid', ['jquery', 'Site'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('jquery'), require('Site'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.jQuery, global.Site);
    global.tablesJsgrid = mod.exports;
  }
})(this, function (_jquery, _Site) {
  'use strict';

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  (0, _jquery2.default)(document).ready(function ($$$1) {
    (0, _Site.run)();
  });

  jsGrid.setDefaults({
    tableClass: "jsgrid-table table table-striped table-hover"
  });

  jsGrid.setDefaults("text", {
    _createTextBox: function _createTextBox() {
      return (0, _jquery2.default)("<input>").attr("type", "text").attr("class", "form-control input-sm");
    }
  });

  jsGrid.setDefaults("number", {
    _createTextBox: function _createTextBox() {
      return (0, _jquery2.default)("<input>").attr("type", "number").attr("class", "form-control input-sm");
    }
  });

  jsGrid.setDefaults("textarea", {
    _createTextBox: function _createTextBox() {
      return (0, _jquery2.default)("<input>").attr("type", "textarea").attr("class", "form-control");
    }
  });

  jsGrid.setDefaults("control", {
    _createGridButton: function _createGridButton(cls, tooltip, clickHandler) {
      var grid = this._grid;

      return (0, _jquery2.default)("<button>").addClass(this.buttonClass).addClass(cls).attr({
        type: "button",
        title: tooltip
      }).on("click", function (e) {
        clickHandler(grid, e);
      });
    }
  });

  jsGrid.setDefaults("select", {
    _createSelect: function _createSelect() {
      var $result = (0, _jquery2.default)("<select>").attr("class", "form-control input-sm"),
          valueField = this.valueField,
          textField = this.textField,
          selectedIndex = this.selectedIndex;

      _jquery2.default.each(this.items, function (index, item) {
        var value = valueField ? item[valueField] : index,
            text = textField ? item[textField] : item;

        var $option = (0, _jquery2.default)("<option>").attr("value", value).text(text).appendTo($result);

        $option.prop("selected", selectedIndex === index);
      });

      return $result;
    }
  });

  
  // Example Basic
  // -------------------
  (function () {
    (0, _jquery2.default)('#exampleBasic').jsGrid({
      height: "500px",
      width: "100%",

      filtering: false,
      editing: false,
      sorting: true,
      paging: true,
      autoload: true,

      pageSize: 15,
      pageButtonCount: 5,

      deleteConfirm: "Quer apagar a ficha do cliente?",

      controller: db,

      fields: [{
        name: "Nome",
        type: "text",
        width: 150
      }, {
        name: "Morada",
        type: "text",
        width: 200
      }, {
        name: "Data de registo",
        type: "number",
        width: 200
      }
        ,{
        name: "Equipamentos",
        type: "read",
        width: 200
      }
       ,{
        name: "Mais Informação",
        type: "read",
        width: 100
      }
      ]
    });
  })();

  // Example Static Data
  // -------------------
 
  // Example Custom Row Renderer
  // ---------------------------
  (function () {
    (0, _jquery2.default)('#exampleCustomRowRenderer').jsGrid({
      height: "500px",
      width: "100%",

      autoload: true,
      paging: true,

      controller: {
        loadData: function loadData() {
          var deferred = _jquery2.default.Deferred();

          _jquery2.default.ajax({
            url: 'http://api.randomuser.me/?results=40',
            dataType: 'json',
            success: function success(data) {
              deferred.resolve(data.results);
            }
          });

          return deferred.promise();
        }
      },

      rowRenderer: function rowRenderer(item) {
        var $photo = (0, _jquery2.default)("<div>").addClass("pr-20").append((0, _jquery2.default)('<a>').addClass('avatar avatar-lg').attr('href', 'javascript:void(0)').append((0, _jquery2.default)("<img>").attr("src", item.picture.medium)));
        var $info = (0, _jquery2.default)("<div>").addClass("media-body").append((0, _jquery2.default)("<p>").append((0, _jquery2.default)("<strong>").text(item.name.first.capitalize() + " " + item.name.last.capitalize()))).append((0, _jquery2.default)("<p>").text("Location: " + item.location.city.capitalize() + ", " + item.location.street)).append((0, _jquery2.default)("<p>").text("Email: " + item.email)).append((0, _jquery2.default)("<p>").text("Phone: " + item.phone)).append((0, _jquery2.default)("<p>").text("Cell: " + item.cell));

        return (0, _jquery2.default)("<tr>").append((0, _jquery2.default)('<td>').append((0, _jquery2.default)('<div class="media">').append($photo).append($info)));
      },

      fields: [{
        title: "Clients"
      }]
    });

    String.prototype.capitalize = function () {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
  })();

  // Example Batch Delete
  // --------------------
  (function () {
    (0, _jquery2.default)('#exampleBatchDelete').jsGrid({
      height: "500px",
      width: "100%",

      autoload: true,
      confirmDeleting: false,
      paging: true,
      controller: {
        loadData: function loadData() {
          return db.clients;
        }
      },
      fields: [{
        headerTemplate: function headerTemplate() {
          return (0, _jquery2.default)("<button>").attr("type", "button").attr("class", "btn btn-primary btn-xs").text("Delete").on("click", function () {
            deleteSelectedItems();
          });
        },
        itemTemplate: function itemTemplate(_, item) {
          return (0, _jquery2.default)("<input>").attr("type", "checkbox").on("change", function () {
            (0, _jquery2.default)(this).is(":checked") ? selectItem(item) : unselectItem(item);
          });
        },
        align: "center",
        width: 50
      }, {
        name: "Name",
        type: "text",
        width: 150
      }, {
        name: "Age",
        type: "number",
        width: 50
      }, {
        name: "Address",
        type: "text",
        width: 200
      }]
    });

    var selectedItems = [];

    var selectItem = function selectItem(item) {
      selectedItems.push(item);
    };

    var unselectItem = function unselectItem(item) {
      selectedItems = _jquery2.default.grep(selectedItems, function (i) {
        return i !== item;
      });
    };

    var deleteSelectedItems = function deleteSelectedItems() {
      if (!selectedItems.length || !confirm("Are you sure?")) return;

      var $grid = (0, _jquery2.default)("#exampleBatchDelete");

      _jquery2.default.each(selectedItems, function (_, item) {
        $grid.jsGrid("deleteItem", item);
      });

      selectedItems = [];
    };
  })();

  // Example Rows Reordering
  // -----------------------
  (function () {
    (0, _jquery2.default)('#exampleRowsReordering').jsGrid({
      height: "500px",
      width: "100%",

      autoload: true,

      rowClass: function rowClass(item, itemIndex) {
        return "client-" + itemIndex;
      },

      controller: {
        loadData: function loadData() {
          return db.clients.slice(0, 15);
        }
      },

      fields: [{
        name: "Name",
        type: "text",
        width: 150
      }, {
        name: "Age",
        type: "number",
        width: 50
      }, {
        name: "Address",
        type: "text",
        width: 200
      }, {
        name: "Country",
        type: "select",
        items: db.countries,
        valueField: "Id",
        textField: "Name"
      }, {
        name: "Married",
        type: "checkbox",
        title: "Is Married",
        sorting: false
      }]
    });

    var $gridData = (0, _jquery2.default)("#exampleRowsReordering .jsgrid-grid-body tbody");

    $gridData.sortable({
      update: function update(e, ui) {
        // array of indexes
        var clientIndexRegExp = /\s+client-(\d+)\s+/;
        var indexes = _jquery2.default.map($gridData.sortable("toArray", {
          attribute: "class"
        }), function (classes) {
          return clientIndexRegExp.exec(classes)[1];
        });
        alert("Reordered indexes: " + indexes.join(", "));

        // arrays of items
        var items = _jquery2.default.map($gridData.find("tr"), function (row) {
          return (0, _jquery2.default)(row).data("JSGridItem");
        });
        console && console.log("Reordered items", items);
      }
    });
  })();

  // Example Custom Grid Field
  // -------------------------
  (function () {
    var MyDateField = function MyDateField(config) {
      jsGrid.Field.call(this, config);
    };

    MyDateField.prototype = new jsGrid.Field({
      sorter: function sorter(date1, date2) {
        return new Date(date1) - new Date(date2);
      },

      itemTemplate: function itemTemplate(value) {
        return new Date(value).toDateString();
      },

      insertTemplate: function insertTemplate() {
        if (!this.inserting) return "";

        var $result = this.insertControl = this._createTextBox();
        return $result;
      },

      editTemplate: function editTemplate(value) {
        if (!this.editing) return this.itemTemplate(value);

        var $result = this.editControl = this._createTextBox();
        $result.val(value);
        return $result;
      },

      insertValue: function insertValue() {
        return this.insertControl.datepicker("getDate");
      },

      editValue: function editValue() {
        return this.editControl.datepicker("getDate");
      },

      _createTextBox: function _createTextBox() {
        return (0, _jquery2.default)("<input>").attr("type", "text").addClass('form-control input-sm').datepicker({
          autoclose: true
        });
      }
    });

    jsGrid.fields.myDateField = MyDateField;

    (0, _jquery2.default)("#exampleCustomGridField").jsGrid({
      height: "500px",
      width: "100%",

      inserting: true,
      editing: true,
      sorting: true,
      paging: true,

      data: db.users,

      fields: [{
        name: "Account",
        width: 150,
        align: "center"
      }, {
        name: "Name",
        type: "text"
      }, {
        name: "RegisterDate",
        type: "myDateField",
        width: 100,
        align: "center"
      }, {
        type: "control",
        editButton: false,
        modeSwitchButton: false
      }]
    });
  })();
});