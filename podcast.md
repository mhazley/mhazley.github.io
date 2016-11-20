---
title: IMPRINT
layout: page
permalink: imprint.html
category: page
---

Some mawd text here leek.

{% assign sorted_gallery = site.photo_gallery | sort: 'weight' %}
<ul class="photo-gallery">
  {% for image in sorted_gallery %}
    <li>
      <a href="{{ image.link }}">
        <img src="{{ image.image_path }}" alt="{{ image.title }}" width="100" height="100">
      </a>
      SOME TEXT HERE LEEK
    </li>
  {% endfor %}
</ul>
