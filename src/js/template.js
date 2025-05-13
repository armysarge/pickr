import * as _ from './utils/utils';

export default instance => {

    const {
        components,
        useAsButton,
        inline,
        appClass,
        theme,
        lockOpacity
    } = instance.options;

    // Utils
    const hidden = con => con ? '' : 'style="display:none" hidden';
    const t = str => instance._t(str);

    const root = _.createFromTemplate(`
      <div :ref="root" class="pickr">

        ${useAsButton ? '' : '<button type="button" :ref="button" class="pcr-button"></button>'}

        <div :ref="app" class="pcr-app ${appClass || ''}" data-theme="${theme}" ${inline ? 'style="position: unset"' : ''} aria-label="${t('ui:dialog', 'color picker dialog')}" role="window">
          <div class="pcr-selection" ${hidden(components.palette)}>
            <div :obj="preview" class="pcr-color-preview" ${hidden(components.preview)}>
              <button type="button" :ref="lastColor" class="pcr-last-color" aria-label="${t('btn:last-color')}"></button>
              <div :ref="currentColor" class="pcr-current-color"></div>
            </div>

            <div :obj="palette" class="pcr-color-palette">
              <div :ref="picker" class="pcr-picker"></div>
              <div :ref="palette" class="pcr-palette" tabindex="0" aria-label="${t('aria:palette')}" role="listbox"></div>
            </div>

            <div :obj="hue" class="pcr-color-chooser" ${hidden(components.hue)}>
              <div :ref="picker" class="pcr-picker"></div>
              <div :ref="slider" class="pcr-hue pcr-slider" tabindex="0" aria-label="${t('aria:hue')}" role="slider"></div>
            </div>

            <div :obj="opacity" class="pcr-color-opacity" ${hidden(components.opacity)}>
              <div :ref="picker" class="pcr-picker"></div>
              <div :ref="slider" class="pcr-opacity pcr-slider" tabindex="0" aria-label="${t('aria:opacity', 'opacity selection slider')}" role="slider"></div>
            </div>
          </div>

          <div class="pcr-swatches ${components.palette ? '' : 'pcr-last'}" :ref="swatches"></div>

          <div :obj="gradient" class="pcr-color-gradient" ${hidden(components.gradient)}>
            <div class="pcr-gradient-header">
              <div class="pcr-gradient-heading">Gradient</div>
              <label class="pcr-gradient-switch">
                <input type="checkbox" :ref="gradientEnabled" aria-label="${t('aria:gradient:enable', 'enable gradient mode')}">
                <span class="pcr-gradient-slider"></span>
              </label>
            </div>
            <div class="pcr-gradient-preview" :ref="preview"></div>
            <div class="pcr-gradient-controls">
              <div class="pcr-gradient-control">
                <label class="pcr-gradient-label">Type</label>
                <div class="pcr-gradient-type">
                  <select :ref="gradientType" aria-label="${t('aria:gradient:type', 'gradient type selector')}">
                    <option value="linear">Linear</option>
                    <option value="radial">Radial</option>
                    <option value="conic">Conic</option>
                  </select>
                </div>
              </div>
              <div class="pcr-gradient-control">
                <label class="pcr-gradient-label">Angle</label>
                <div class="pcr-gradient-angle">
                  <input :ref="gradientAngle" type="number" min="0" max="360" value="90" aria-label="${t('aria:gradient:angle', 'gradient angle')}" data-type="linear">
                </div>
              </div>
            </div>
            <div class="pcr-gradient-colors" :ref="colors">
              <label class="pcr-gradient-label">Colors</label>
              <div class="pcr-gradient-color-container">
                <div :ref="color1" class="pcr-gradient-color active"></div>
                <div :ref="color2" class="pcr-gradient-color"></div>
              </div>
            </div>
          </div>

          <div :obj="interaction" class="pcr-interaction" ${hidden(Object.keys(components.interaction).length)}>
            <input :ref="result" class="pcr-result" type="text" spellcheck="false" ${hidden(components.interaction.input)} aria-label="${t('aria:input', 'color input field')}">

            <input :arr="options" class="pcr-type" data-type="HEXA" value="${lockOpacity ? 'HEX' : 'HEXA'}" type="button" ${hidden(components.interaction.hex)}>
            <input :arr="options" class="pcr-type" data-type="RGBA" value="${lockOpacity ? 'RGB' : 'RGBA'}" type="button" ${hidden(components.interaction.rgba)}>
            <input :arr="options" class="pcr-type" data-type="HSLA" value="${lockOpacity ? 'HSL' : 'HSLA'}" type="button" ${hidden(components.interaction.hsla)}>
            <input :arr="options" class="pcr-type" data-type="HSVA" value="${lockOpacity ? 'HSV' : 'HSVA'}" type="button" ${hidden(components.interaction.hsva)}>
            <input :arr="options" class="pcr-type" data-type="CMYK" value="CMYK" type="button" ${hidden(components.interaction.cmyk)}>

            <input :ref="save" class="pcr-save" value="${t('btn:save')}" type="button" ${hidden(components.interaction.save)} aria-label="${t('aria:btn:save')}">
            <input :ref="cancel" class="pcr-cancel" value="${t('btn:cancel')}" type="button" ${hidden(components.interaction.cancel)} aria-label="${t('aria:btn:cancel')}">
            <input :ref="clear" class="pcr-clear" value="${t('btn:clear')}" type="button" ${hidden(components.interaction.clear)} aria-label="${t('aria:btn:clear')}">
          </div>
        </div>
      </div>
    `);

    const int = root.interaction;

    // Select option which is not hidden
    int.options.find(o => !o.hidden && !o.classList.add('active'));

    // Append method to find currently active option
    int.type = () => int.options.find(e => e.classList.contains('active'));
    return root;
};
