<script>
window.addEventListener('load', function() {

  const wait = setInterval(() => {
    const providerContainer = document.querySelector('.⭐️fet0cw-0.providerGames');
    const input = providerContainer ? providerContainer.querySelector('.inputSearch') : null;
    const nameElements = document.querySelectorAll('.belowImgText .⭐️knubti-0.truncate');

    if (!providerContainer || !input || nameElements.length === 0) {
      console.log('⏳ Menunggu elemen inputSearch dan nama pasaran muncul...');
      return;
    }
    clearInterval(wait);


    const providerNames = Array.from(
      new Set(
        Array.from(nameElements)
          .map(el => el.textContent.trim())
          .filter(v => v.length > 1)
      )
    );

    const dropdown = document.createElement('ul');
    dropdown.className = 'autocomplete-dropdown';
    Object.assign(dropdown.style, {
      position: 'fixed',
      background: '#fff',
      border: '1px solid #ccc',
      borderRadius: '8px',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      maxHeight: '240px',
      overflowY: 'auto',
      boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
      zIndex: 2147483647,
      display: 'none',
      fontSize: '14px',
      color: '#000'
    });
    document.body.appendChild(dropdown);


    function positionDropdown() {
      const rect = input.getBoundingClientRect();
      dropdown.style.top = rect.bottom + window.scrollY + 'px';
      dropdown.style.left = rect.left + window.scrollX + 'px';
      dropdown.style.width = rect.width + 'px';
    }

    function highlightMatch(text, search) {
      if (!search) return text;
      const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
      return text.replace(regex, '<b>$1</b>');
    }

    input.addEventListener('input', function() {
      const val = this.value.toLowerCase();
      dropdown.innerHTML = '';
      if (!val) { dropdown.style.display = 'none'; return; }

      const filtered = providerNames.filter(name => name.toLowerCase().includes(val));
      if (!filtered.length) { dropdown.style.display = 'none'; return; }

      filtered.forEach(name => {
        const li = document.createElement('li');
        li.innerHTML = highlightMatch(name, val);
        Object.assign(li.style, {
          padding: '10px 14px',
          cursor: 'pointer',
          borderBottom: '1px solid #eee',
          background: '#fff'
        });
        li.addEventListener('mouseover', () => li.style.background = '#f5f5f5');
        li.addEventListener('mouseout', () => li.style.background = '#fff');
        li.addEventListener('click', () => {
          input.value = name;
		  dropdown.style.display = 'none';

		  const event = new Event('input', { bubbles: true, cancelable: true });
		  input.dispatchEvent(event);
		  
        });
        dropdown.appendChild(li);
      });

      positionDropdown();
      dropdown.style.display = 'block';
    });

    document.addEventListener('click', e => {
      if (!dropdown.contains(e.target) && e.target !== input)
        dropdown.style.display = 'none';
    });

    window.addEventListener('scroll', positionDropdown);
    window.addEventListener('resize', positionDropdown);

    input.addEventListener('focus', function() {
      if (this.value && dropdown.children.length > 0) {
        positionDropdown();
        dropdown.style.display = 'block';
      }
    });
  }, 500);
});
</script>

<style>
.autocomplete-dropdown b {
  font-weight: 700;
  color: #f28b00; 
}
</style> 