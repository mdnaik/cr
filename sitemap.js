! function (e, o) {
	var t = o.getElementById(toc_config.containerId),
		c = o.getElementsByTagName("head")[0],
		n = [];
	e[toc_config.jsonCallback] = function (e) {
		for (var o, c, i = e.feed.entry, a = e.feed.category, l = "", s = 0, d = a.length; d > s; ++s) n.push(a[s].term);
		for (var r = 0, f = i.length; f > r; ++r)(toc_config.showNew || toc_config.showNew > 0) && r < toc_config.showNew + 1 && (i[r].title.$t += " %new%");
		i = toc_config.sortAlphabetically.theList ? i.sort(function (e, o) {
			return e.title.$t.localeCompare(o.title.$t)
		}) : i, toc_config.sortAlphabetically.thePanel && n.sort();
		for (var g = 0, h = n.length; h > g; ++g) {
			l += '<h7 class="toc-header">' + n[g] + "</h7>", l += '<div class="toc-content"><ol>';
			for (var _ = 0, p = i.length; p > _; ++_) {
				o = i[_].title.$t;
				for (var w = 0, u = i[_].link.length; u > w; ++w)
					if ("alternate" == i[_].link[w].rel) {
						c = i[_].link[w].href;
						break
					}
				for (var v = 0, m = i[_].category.length; m > v; ++v) n[g] == i[_].category[v].term && (l += '<li><a href="' + c + '">' + o.replace(/ \%new\%$/, "") + "</a>" + (o.match(/\%new\%/) ? " " + toc_config.newText : "") + "</li>")
			}
			l += "</ol></div>"
		}
		t.innerHTML = l, "undefined" != typeof jQuery && ($("#" + toc_config.containerId + " .toc-content").hide(), $("#" + toc_config.containerId + " .toc-header").click(function () {
			$(this).hasClass("active") || (toc_config.clickCallback(this), $("#" + toc_config.containerId + " .toc-header").removeClass("active").next().slideUp(toc_config.slideSpeed.up, toc_config.slideEasing.up, toc_config.slideCallback.up), $(this).addClass("active").next().slideDown(toc_config.slideSpeed.down, toc_config.slideEasing.down, toc_config.slideCallback.down))
		}).eq(toc_config.activePanel - 1).addClass("active").next().slideDown(toc_config.slideSpeed.down, toc_config.slideEasing.down, toc_config.slideCallback.down))
	};
	var i = o.createElement("script");
	i.src = toc_config.url.replace(/\/$/, "") + "/feeds/posts/summary?alt=json-in-script&max-results=" + toc_config.maxResults + "&callback=" + toc_config.jsonCallback, "onload" == toc_config.delayLoading ? e.onload = function () {
		c.appendChild(i)
	} : e.setTimeout(function () {
		c.appendChild(i)
	}, toc_config.delayLoading)
}(window, document);
