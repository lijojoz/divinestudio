$assets = @{
    "hero.jpg" = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=2000"
    "about1.jpg" = "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1200"
    "about2.jpg" = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200"
    "svc1.jpg" = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800"
    "svc2.jpg" = "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&q=80&w=800"
    "svc3.jpg" = "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=800"
    "svc4.jpg" = "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=800"
    "svc5.jpg" = "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?auto=format&fit=crop&q=80&w=800"
    "svc6.jpg" = "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800"
    "gal1.jpg" = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000"
    "gal2.jpg" = "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1000"
    "gal3.jpg" = "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&q=80&w=1000"
    "gal4.jpg" = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1000"
    "gal5.jpg" = "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?auto=format&fit=crop&q=80&w=1000"
    "gal6.jpg" = "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=1000"
    "gal7.jpg" = "https://images.unsplash.com/photo-1604153150163-3490b0a72f9a?auto=format&fit=crop&q=80&w=1000"
    "gal9.jpg" = "https://images.unsplash.com/photo-1630939230938-fc59f08def7a?auto=format&fit=crop&q=80&w=1000"
    "av1.jpg" = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100"
    "map.jpg" = "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1200"
}

if (!(Test-Path "assets")) { New-Item -ItemType Directory -Path "assets" }

foreach ($name in $assets.Keys) {
    $url = $assets[$name]
    $path = "assets/$name"
    Write-Host "Downloading $name..."
    Invoke-WebRequest -Uri $url -OutFile $path
}

# Symlinks/Copies for re-used assets
Copy-Item "assets/gal1.jpg" "assets/film1.jpg"
Copy-Item "assets/gal2.jpg" "assets/film2.jpg"
Copy-Item "assets/gal3.jpg" "assets/film3.jpg"
Copy-Item "assets/gal4.jpg" "assets/film4.jpg"
Copy-Item "assets/gal1.jpg" "assets/vid1.jpg"
Copy-Item "assets/gal2.jpg" "assets/vid2.jpg"
Copy-Item "assets/gal3.jpg" "assets/vid3.jpg"
Copy-Item "assets/gal4.jpg" "assets/vid4.jpg"
Copy-Item "assets/gal5.jpg" "assets/vid5.jpg"
