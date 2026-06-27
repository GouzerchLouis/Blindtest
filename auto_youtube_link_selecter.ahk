#MaxThreadsPerHotkey 2 ;

F3::
CoordMode, Mouse, Screen ;
toggle := !toggle

While (toggle) {
	MouseMove, 1100, 110
	
	Click,
	Send,  {Home}
	Send, +{End} 
	Send, ^c

	Sleep, 500 

	MouseMove, 560, 150 
	Click,
	Send, ^v
	Send, {Space}lyrics {Enter} 

	Sleep, 2500 
	MouseMove, 350, 400
	Click, Right

	Sleep, 200 
	MouseMove, 365, 600
	Click,

	Sleep, 200 
	MouseMove, 1300, 110 ; 1. Déplace la souris
	Click,
	Send, ^v
	Sleep, 200 
	Send, {Space}
	
	Sleep, 200 
	Send, ^{Down}

}
return
