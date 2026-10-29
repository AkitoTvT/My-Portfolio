const skills = {
  servicing: {
    label: 'Computer Servicing',
    title: 'Reliable technical foundations.',
    body: 'Computer System Servicing skills including hardware setup, system maintenance, Windows installation, peripheral setup, and basic troubleshooting.',
    tags: ['TESDA NC II', 'Computer Hardware', 'Windows', 'Troubleshooting']
  },
  automation: {
    label: 'n8n Automation',
    title: 'Connect tools. Simplify tasks.',
    body: 'Workflow creation and task automation with n8n, including API integrations, webhooks, and basic LLM prompting and integration.',
    tags: ['n8n', 'API Integration', 'Webhooks', 'AI Prompting']
  },
  creative: {
    label: 'AI & UGC Content',
    title: 'Ideas made visual.',
    body: 'AI video and UGC content creation, video editing, prompt engineering, and AI-assisted branding, with graphic design tools for visual content.',
    tags: ['AI Video', 'UGC Content', 'Photoshop', 'Canva', 'Video Editing']
  },
  social: {
    label: 'Social Media',
    title: 'Content made for people.',
    body: 'Social media management, content planning, visual storytelling, and AI-assisted branding for clear, consistent communication.',
    tags: ['Social Media', 'Content Planning', 'Branding', 'Communication']
  },
  development: {
    label: 'Development',
    title: 'A foundation in code.',
    body: 'Training and practical experience with HTML, CSS, and Python, supported by an Information Technology education.',
    tags: ['HTML', 'CSS', 'Python']
  }
};

const menuButton = document.querySelector('.menu');
const navigation = document.querySelector('.navlinks');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    navigation.classList.toggle('open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

function SkillTabs() {
  const [selectedSkill, setSelectedSkill] = React.useState('automation');
  const categories = Object.keys(skills);
  const currentIndex = categories.indexOf(selectedSkill);
  const skill = skills[selectedSkill];
  const createElement = React.createElement;

  function handleKeyDown(event) {
    let nextIndex;

    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % categories.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + categories.length) % categories.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = categories.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    const nextSkill = categories[nextIndex];
    setSelectedSkill(nextSkill);
    document.getElementById(`tab-${nextSkill}`)?.focus();
  }

  return createElement(
    React.Fragment,
    null,
    createElement(
      'div',
      { className: 'tabs', role: 'tablist', 'aria-label': 'Skill categories' },
      categories.map((category) => createElement(
        'button',
        {
          className: 'tab',
          id: `tab-${category}`,
          type: 'button',
          role: 'tab',
          'aria-selected': selectedSkill === category,
          'aria-controls': 'skill-panel',
          tabIndex: selectedSkill === category ? 0 : -1,
          key: category,
          onClick: () => setSelectedSkill(category),
          onKeyDown: handleKeyDown
        },
        skills[category].label
      ))
    ),
    createElement(
      'div',
      {
        className: 'skillpanel',
        id: 'skill-panel',
        role: 'tabpanel',
        'aria-labelledby': `tab-${selectedSkill}`,
        tabIndex: 0
      },
      createElement('h3', null, skill.title),
      createElement('p', null, skill.body),
      createElement(
        'div',
        { className: 'tags' },
        skill.tags.map((tag) => createElement('span', { className: 'tag', key: tag }, tag))
      )
    )
  );
}

const skillsRoot = document.querySelector('#skills-app');

if (skillsRoot && window.React && window.ReactDOM) {
  ReactDOM.createRoot(skillsRoot).render(React.createElement(SkillTabs));
} else {
  const tabs = [...document.querySelectorAll('.tab')];
  const panel = document.querySelector('#skill-panel');

  function selectTab(tab) {
    const skill = skills[tab.dataset.skill];
    if (!skill || !panel) return;

    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });

    panel.setAttribute('aria-labelledby', tab.id);
    panel.replaceChildren();

    const heading = document.createElement('h3');
    heading.textContent = skill.title;
    const body = document.createElement('p');
    body.textContent = skill.body;
    const tagWrap = document.createElement('div');
    tagWrap.className = 'tags';

    skill.tags.forEach((tagText) => {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = tagText;
      tagWrap.appendChild(tag);
    });

    panel.append(heading, body, tagWrap);
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', (event) => {
      let nextIndex;

      if (event.key === 'ArrowRight') {
        nextIndex = (index + 1) % tabs.length;
      } else if (event.key === 'ArrowLeft') {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === 'Home') {
        nextIndex = 0;
      } else if (event.key === 'End') {
        nextIndex = tabs.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      selectTab(tabs[nextIndex]);
      tabs[nextIndex].focus();
    });
  });
}

const copyButton = document.querySelector('#copy-email');
const copyStatus = document.querySelector('#copy-status');

if (copyButton && copyStatus) {
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('vinmiranda0730@gmail.com');
      copyStatus.textContent = 'Email copied.';
    } catch (error) {
      copyStatus.textContent = 'Email: vinmiranda0730@gmail.com';
    }
  });
}

const animatedElements = document.querySelectorAll('[data-animate]');

if ('IntersectionObserver' in window) {
  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  animatedElements.forEach((element) => animationObserver.observe(element));
} else {
  animatedElements.forEach((element) => element.classList.add('is-visible'));
}
