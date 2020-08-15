function ScrollBox(selector) {
    var
      buildElements = function(target, elements) {
        elements.each(function(index, listItem) {
          var
            faFactor = Math.floor(elements.length - (target + index)),
            faFactorMultiplier = 10,
            $listItem = $(listItem),
            translate,
            cssObj;
          // Normalize
          faFactor = Math.abs(faFactor) / faFactorMultiplier;
          translate = Math.pow(2, faFactor * faFactorMultiplier);
          cssObj = {
            opacity: 1 - faFactor,
            transform: 'scale(' + (1 - faFactor) + ') ' +
              'translateY(' + (translate * (faFactor < 0 ? -1 : 1)) + 'px)',
            '-webkit-filter': 'blur(' + (faFactor * 4) + 'px)'
          };
          $listItem.css(cssObj);
          $listItem.attr('tabindex', index + 1);
        });
      },
  
      init = function(elements) {
        if (!elements) {
          return;
        } else {
          if (!window.ScrollBoxInstances) {
            window.ScrollBoxInstances = 1;
          } else {
            window.ScrollBoxInstances += 1;
          }
        }
        elements.on('focus mouseover', function() {
          var
            len = elements.length,
            idx = $(this).index();
          buildElements(len - idx, elements);
          $(this).parent().scrollTop(idx * len);
        });
        elements.on('focus click', function() {
          elements.removeClass('set');
          $(this).addClass('set');
        });
        buildElements(elements.length, elements);
      },
      _this = this;
  
    this.listElements = $(selector);
    init(this.listElements);
  };
  
  // Here goes nothing
  new ScrollBox('.months li');
  new ScrollBox('.days li');
  new ScrollBox('.years li');
  new ScrollBox('.hours li');
  new ScrollBox('.minutes li');