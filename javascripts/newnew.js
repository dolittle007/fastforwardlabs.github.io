$(document).ready(function() {

	var $nav_links = $('.nav-scroll a');
	$nav_links.click(function() {
		var target = $(this.hash);
		$('html,body').animate({
		  scrollTop: target.offset().top
		}, 200);
		return false;
	});

	// TODO: touch events and resize
	var $report_holder = $('.full-holder');
	$report_holder.each(function() {
		var $this = $(this);
		var width = $this.width();
		var $report_images = $this.find('img');
		var image_num = $report_images.length;
		var sect_width = width/image_num;
		var $image_slider_holder = $this.find('.image-slider-holder');
		var $slider_sects = $image_slider_holder.children();
		$this.on("mousemove",function(e) {
			var $this = $(this);
			var mouse_x = e.pageX - $this.offset().left;
			for (var i=0; i<image_num; i++) {
				var multiplier = i + 1;
				if (mouse_x < sect_width * multiplier) {
					$report_images.removeClass('active');
					$report_images.eq(i).addClass('active');
					$slider_sects.removeClass('active');
					$slider_sects.eq(i).addClass('active');
					break;
				}
			}
		});
	});

	var $video_holder = $('.video-holder');
	$video_holder.mouseenter(function() {
		var $this = $(this);
		if ($this.hasClass('loaded') || $(this).hasClass('loading')) {
			$(this).find('video').get(0).play();
		} else {
			$this.addClass('loading');
			var name = $this.attr('data-video');
			var resource = "resources/videos/" + name + ".mp4";
			$this.append('<video src=' + resource + ' loop="true"></video>');
			var $video = $this.children('video');
			var $progress_indicator = $this.parent().find('.video-progress');
			var video = $video.get(0);
			$video.on("canplay", function() {
				$this.removeClass('loading').addClass('loaded');
				video.play();
			});
			$video.on('timeupdate', function() {
				var currentPos = video.currentTime; //Get currenttime
				var maxduration = video.duration; //Get video duration
				var percentage = 100 * currentPos / maxduration; //in %
				$progress_indicator.css('width', percentage+'%');
			});
		}
	});
	$video_holder.mouseleave(function() {
	  $(this).find('video').get(0).pause();
	});

	var $body = $('body');

	$('#contacter').click(function() {
		$body.addClass('overlayed');
		return false;
	});

	$('#xer').click(function() {
		$body.removeClass('overlayed');
	});

});