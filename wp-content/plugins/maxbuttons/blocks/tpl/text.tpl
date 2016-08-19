		{if:label} 	<label>%%label%%</label> {/if:label} 
		<div class="input text %%name%%">{if:before_input} %%before_input%% {/if:before_input}
			<input type="text"
				id="%%id%%"
				name="%%name%%"
				value="%%value%%" 
				placeholder="%%placeholder%%" 
				{if:inputclass}class="%%inputclass%%"{/if:inputclass} 
			/></div>

