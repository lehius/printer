;(function($){
  let textereaMD = {}
  let textereaStyle = {}
  let preview = {}
 /*html*/
   const html = `
   <div id="editor">
      <div class="form-group col-sm-6" id="markdown">
        <label for="template" class="control-label col-sm-10">Markdown:</label>
        <div class="col-sm-12">
          <textarea class="form-control" rows="20"></textarea>
        </div>
      </div>
      <div class="form-group col-sm-6" id="style">
        <label for="template" class="control-label col-sm-10">Style:</label>
        <div class="col-sm-12">
          <textarea class="form-control" rows="20"></textarea>
        </div>
      </div>
      <div class="form-group col-sm-10" id="footer-editor">
        <div class="btn btn-default btn-prtint">Печать</div>
        <div class="btn btn-default btn-preview">Предпросмотр</div>
      </div>
    </div>
    <div id=preview>
      <img src="" alt="preview" class="img-thumbnail hidden">
    </div>
  `

  class API {
    constructor() {
      if (API.exist) {
        return API.instance
      }
      API.instance = this
      API.exist = true
    }
    async preview(body) {
      body.Emulation = true
      const opts = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      }
      const reps = await fetch("/print", opts)
      console.log(resp)
    }
  }
  const send = new API()
  const defaultOptions = {}
  const methods = {
    init(_Data) {
      this.each(() => {
        const self = $(this);
        let data = self.data('ticketEditor');
        if (!data) {
          data = $.extend(true, defaultOptions, _Data);
          self.data('ticketEditor', data)
        }
        methods.refresh.apply(self)
      })
      return this
    },
    data(_Data) {
      if (!_Data) {
        return $(this).data('ticketEditor');
      }
      this.each(() => {
        const self = $(this);
        self.data('ticketEditor', $.extend(self.data('ticketEditor'), _Data));
        methods.refresh.apply(self);
      })
      return this
    },
    refresh() {
      this.each(() => {
        const self = $(this);
        const data = self.data('ticketEditor');
        self.append(html);
        textereaMD = $('#markdown textarea' ,self)
        textereaStyle = $('#style textarea' ,self)
        preview = $('#preview img' ,self)
        $('#footer-editor .btn-preview').off('click').on('click', () => {
          methods.preview()
        })
      })
      return this;
    },
    preview(data) {
      const printOpts = {
        Template: data && data.md ? data.md : textereaMD.val(),
        Style: data && data.style ? data.style : textereaStyle.val(),
        Emulation: true,
        Ticket: {
          Number: 'A001',
          Services: [
            {
              Name: 'Услуга 1'
            }
          ],
          Datetime: new Date()
        },
        Pictures: [
          {
            Anchor: 
          }
        ]
      }
      const md = data && data.md ? data.md : textereaMD.val()
      const style = data && data.style ? data.style : textereaStyle.val()
      send.preview({md, style})

    }
  }
  jQuery.fn.ticketEditor = function(method) {
    if (methods[method]) {
      return methods[mehthod].apply(this, Array.prototype.slice(arguments, 1));
    } else if (typeof method === 'object' || !method ) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Метод с именем "'+method+'" не существует для jQuery.ticketEditor');
    }
  };
})(jQuery)