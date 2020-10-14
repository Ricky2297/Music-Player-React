import React from "react";

export class Home extends React.Component {
	constructor() {
		super();
		this.player = null;
		this.state = {
			songs: [],
			currentSong: 0
		};
		this.player = null;
	}
	// onload this function below will execute

	componentDidMount() {
		this.pauseBtn.style.display = "none";
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(resp => resp.json())
			.then(songs => this.setState({ songs }));
	}
	play(index) {
		const url = this.state.songs[index].url;
		if (url)
			this.player.src = "https://assets.breatheco.de/apis/sound/" + url;
		// Actualiza el player de null a play
		this.player.play();
		// hacer desaparecer el botón de reproducción
		this.playBtn.style.display = "none";
		//muestra el boton de pausa
		this.pauseBtn.style.display = "inline-block";
		// establecer el estado actual en la canción actual que el usuario ha elegido
		this.setState({ currentSong: index });
	}
	pause() {
		this.player.pause();
		// hacer desaparecer el botón de reproducción
		this.playBtn.style.display = "inline-block";
		//muestra el boton de pausa
		this.pauseBtn.style.display = "none";
	}

	render() {
		return (
			<div id="container" className="container col-4">
				<h1 className="text-center">R1CK7 Music</h1>
				<ol>
					{this.state.songs.map((song, index) => {
						return (
							<li
								className={
									this.state.currentSong == index
										? "song active"
										: "song"
								}
								onDoubleClick={() => this.play(index)}
								key={index}>
								{song.name}
							</li>
						);
					})}
				</ol>

				<section id="buttons" className="text-center">
					<button
						onClick={() => this.play(this.state.currentSong - 1)}>
						<i className="fas fa-caret-square-left" />
					</button>

					<button
						ref={play => (this.playBtn = play)}
						onClick={() => this.play(this.state.currentSong)}>
						<i className="fas fa-play" />
					</button>

					<button
						ref={pause => (this.pauseBtn = pause)}
						onClick={() => this.pause()}>
						<i className="fas fa-pause-circle" />
					</button>

					<button
						onClick={() => this.play(this.state.currentSong + 1)}>
						<i className="fas fa-caret-square-right" />
					</button>
				</section>

				<audio ref={player => (this.player = player)} />
			</div>
		);
	}
}
